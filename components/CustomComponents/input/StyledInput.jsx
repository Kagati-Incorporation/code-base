import styled from "styled-components";
import theme from "theme_provider/theme";
import { Input } from "antd";

export default styled(Input)`
  width: 100%;
  height: 56px;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #a1a1a1;
  box-sizing: border-box;
  border-radius: 8px;
  color: ${theme.textLightColor};
`;
