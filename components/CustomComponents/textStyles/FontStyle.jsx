import styled from "styled-components";
import theme from "theme_provider/theme";

const LargeTitle = styled.header`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  cursor:pointer
  color: #2d3047;
`;

const MediumTitle = styled.header`
  font-family: Montserrat;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 32px;
  color: ${theme.whiteColor};
`;

const SmallText = styled.header`
  font-family: Montserrat;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.textLightColor};
  cursor: pointer;
`;

const MiniText = styled(SmallText)`
  font-size: 14px;
  line-height: 16px;
`;

export { MediumTitle, LargeTitle, SmallText, MiniText };
