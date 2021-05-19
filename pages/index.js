import dynamic from "next/dynamic";
import { Col } from "antd";
const Login = dynamic(() => import("./login/index"));

export default function Home() {
  return <Login />;
}
