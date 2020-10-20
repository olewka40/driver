import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import styled from "styled-components";
import {Button} from "@material-ui/core";

export const AllFunc = () => {
  const { driver } = useContext(DataContext);
  console.log(driver);
  return <Container>
    <Button></Button>
  </Container>;
};

const Container = styled.div`
  height: 100%;
  width: 100%;
`;
