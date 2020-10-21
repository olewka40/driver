import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { RegUser } from "./RegUser";
import { RegLic } from "./RegLic";
import { RegVenicle } from "./RegVenicle";
// import { UpdateLic } from "./RegLic/updateLic";

export const Registration = () => {
  return (
    <Container>
      <Switch>
        <Route path="/registration/user">
          <RegUser />
        </Route>
        <Route path="/registration/licence">
          <RegLic />
        </Route>
        <Route path="/registration/venicle">
          <RegVenicle />
        </Route>
        {/*<Route path="/registration/update/licence">*/}
        {/*  <UpdateLic />*/}
        {/*</Route>*/}
      </Switch>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
