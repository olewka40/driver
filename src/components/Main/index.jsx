import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import styled from "styled-components";
export const Main = () => {
  const { driver } = useContext(DataContext);
  console.log(driver);
  return <Container></Container>;
};

const Container = styled.div`
  height: 100%;
  width: 100%;
`;
