import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { AccidentReg } from "./AccidentReg";
import { FineIssue } from "./FineIssue";
import { FinePay } from "./FinePay";
import { InsuranceAccept } from "./insuranceAccept";
import { InsuranceDeposit } from "./InsuranceDeposit";
import { InsurancePay } from "./InsurancePay";
import { ViewDbt } from "./Viewdebt";

export const Allfunc = () => {
  return (
    <Container>
      123123123123123
      <Switch>
        <Route path="/functions/accidentReg">
          <AccidentReg />
        </Route>
        <Route path="/functions/fineIssue">
          <FineIssue />
        </Route>
        <Route path="/functions/finePay">
          <FinePay />
        </Route>
        <Route path="/functions/insuranceAccept">
          <InsuranceAccept />
        </Route>
        <Route path="/functions/insuranceDeposit">
          <InsuranceDeposit />
        </Route>
        <Route path="/functions/insurancePay">
          <InsurancePay />
        </Route>
        <Route path="/functions/other">
          <ViewDbt />
        </Route>
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
