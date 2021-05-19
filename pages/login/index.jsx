import { Col, Form, Divider, Image, Row } from "antd";
import Text from "antd/lib/typography/Text";
import React, { useState } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import * as types from "../../store/types";
import Link from "next/link";
import { useAuth } from "firebase/AuthContext";
import Notification from "@/components/Notifications";
import { userLoginAction } from "store/actions/userAction";
import theme from "theme_provider/theme";
import { withTheme } from "styled-components";
import PrimaryButton from "@/components/CustomComponents/buttons/PrimaryButton";
import { SmallText } from "@/components/CustomComponents/textStyles/FontStyle";
import StyledInput from "@/components/CustomComponents/input/StyledInput";
import Container from "@/components/CustomComponents/wrapper/Container";
const AuthCommonComponent = dynamic(() =>
  import("@/components/AuthCommonComponent")
);

function Login() {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const { login, getIdTokenForUser, signInWithGoogle, signInWithFacebook } =
    useAuth();

  const [loginData, setLoginData] = useState({
    email_address: "",
    password: "",
  });

  const [remember, setRemember] = useState(false);

  // const handleCheckboxChange = (e) => {
  //   setRemember(e.target.checked);
  // };

  const [loading, setLoading] = useState(false);

  const { email_address, password } = loginData;

  const handleInputChange = (e) => {
    const value = e.target.value;

    setLoginData({ ...loginData, [e.target.name]: value });
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithGoogle()
        .then((res) => {
          console.log(res);
          getIdTokenForUser()
            .then((token) => {
              dispatch(userLoginAction(token, remember, router));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      message.error("Failed to sign in!");
    }
    setLoading(false);
  };

  const loginWithFacebook = async () => {
    try {
      setLoading(true);
      await signInWithFacebook()
        .then((res) => {
          console.log(res);
          getIdTokenForUser()
            .then((token) => {
              dispatch(userLoginAction(token, remember, router));
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      message.error("Failed to sign in!");
    }
    setLoading(false);
  };

  const submitLoginData = async () => {
    try {
      setLoading(true);
      await login(email_address, password)
        .then((res) => {
          dispatch({
            type: types.SET_USER_VERIFIED,
            payload: res.user.emailVerified,
          });

          if (res.user.emailVerified) {
            getIdTokenForUser()
              .then((token) => {
                console.log("token", token);
                dispatch(userLoginAction(token, remember, router));
              })
              .catch((err) => setLoading(false));
          } else {
            router.push("/verify-email");
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          Notification("error", err && err.message);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
      message.error("Failed to sign in!");
    }
    setLoading(false);
  };

  return (
    <>
      <Container>
        <Row justify="center" align="middle" className="login-page">
          <Col xs={24} sm={16} lg={9} xl={8}>
            <AuthCommonComponent
              title="Login"
              loginWithGoogle={loginWithGoogle}
              loginWithFacebook={loginWithFacebook}
            />

            <Form layout="vertical" form={form} onFinish={submitLoginData}>
              <Row justify="center" gutter={[16, 16]}>
                <Col xs={24}>
                  <Form.Item
                    name="email_address"
                    rules={[
                      { required: true, message: "Email is required" },
                      {
                        type: "email",
                        message: "Please enter a valid email address",
                      },
                    ]}
                  >
                    <StyledInput
                      name="email_address"
                      onChange={handleInputChange}
                      placeholder="Email"
                      type="email"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24}>
                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: "Password is required" },
                    ]}
                  >
                    <StyledInput
                      name="password"
                      onChange={handleInputChange}
                      placeholder="Password"
                      type="password"
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} align="end">
                  <Link href="/forgot-password">
                    <SmallText
                      style={{ color: theme.blueColor, fontSize: "14px" }}
                    >
                      Forgot password?
                    </SmallText>
                  </Link>
                </Col>

                <Col xs={24}>
                  <PrimaryButton htmlType="submit">Login</PrimaryButton>
                </Col>

                <Col xs={24}>
                  <Row justify="center">
                    <SmallText>
                      Don’t have an account?{" "}
                      <Link href="">
                        <span>
                          <Text style={{ color: theme.blueColor }}>
                            Create account
                          </Text>
                        </span>
                      </Link>
                    </SmallText>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default withTheme(Login);
