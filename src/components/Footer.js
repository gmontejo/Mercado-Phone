import React from "react";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterStyle className="text-center">
      <h5>MERCADOPHONE</h5>
    </FooterStyle>
  );
}

const FooterStyle = styled.div`
  padding: 1rem;
  height: 4rem;
  color: var(--mainWhite);
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(18, 18, 29, 1) 50%,
    rgba(0, 0, 0, 1) 100%
  );
`;
