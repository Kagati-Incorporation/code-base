import { Col, Divider, Image, Row } from "antd";
import React from "react";
import styled, { withTheme } from "styled-components";
import { SmallText } from "./CustomComponents/textStyles/FontStyle";
import { LargeTitle } from "./CustomComponents/textStyles/FontStyle";

const StyledSocialMediaButton = styled.button`
  border: 1px solid #1c2834;
  box-sizing: border-box;
  border-radius: 8px;
  height: 48px;
  width: 100%;
  background: transparent;
`;

function AuthCommonComponent(props) {
  const { loginWithGoogle, loginWithFacebook } = props;

  return (
    <>
      <Col xs={24}>
        <Row justify="center" style={{ marginBottom: "20px" }}>
          <LargeTitle>{props.title}</LargeTitle>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <StyledSocialMediaButton onClick={() => loginWithFacebook()}>
              <SmallText style={{ color: props.theme.primaryColor }}>
                <Image
                  src="/Facebook.svg"
                  preview={false}
                  style={{ padding: "0px 10px 0px 0px" }}
                />
                Continue with Facebook
              </SmallText>
            </StyledSocialMediaButton>
          </Col>
          <Col xs={24}>
            <StyledSocialMediaButton onClick={() => loginWithGoogle()}>
              <SmallText style={{ color: props.theme.primaryColor }}>
                <Image
                  src="/Google.svg"
                  preview={false}
                  style={{ padding: "0px 10px 0px 0px" }}
                />
                Continue with Google
              </SmallText>
            </StyledSocialMediaButton>
          </Col>

          <Col xs={24}>
            <Divider>
              <SmallText>or</SmallText>
            </Divider>
          </Col>
        </Row>
      </Col>
    </>
  );
}

export default withTheme(AuthCommonComponent);
