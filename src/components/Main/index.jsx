import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
export const Main = () => {
  return (
    <Container>
      ����� ����������
      <Link to="/profile"> ������� � �������</Link>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
`;
