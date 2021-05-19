import styled from "styled-components";
export default styled.div`
  width: 100%;
  max-width: 1400px;
  margin: auto;
  @media (max-width: 576px) {
    padding: 0 16px;
  }

  @media (min-width: 576px) {
    padding: 0 16px;
  }

  @media (min-width: 768px) {
    padding: 0 32px;
  }

  @media (min-width: 992px) {
    padding: 0 64px;
  }
`;
