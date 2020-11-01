import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import { DataContext } from "../../context/DataContext";
import Button from "@material-ui/core/Button";

export const Fines = memo(() => {
  const [fines, setFines] = useState();
  const { driver, account } = useContext(DataContext);
  const getFines = useCallback(async () => {
    const finess = await driver.methods.getFinesID().call({ from: account });
    const fine = await driver.methods.getFine(6).call({ from: account });
    console.log(fine);
    console.log(finess);
  }, [driver, account]);

  const finePay = async () => {
    await driver.methods.finePay(111, 6).send({ from: account, value: 10 });
  };
  // useEffect(() => {
  // getFines().then((r) => r);
  // }, [getFines]);
  return (
    <StyledFinesPage>
      {/*{fines.map((fine) => (*/}
      {/*  <Card>*/}
      {/*    <CardInfo>*/}
      {/*      <div>fine.id</div>*/}
      {/*      <div>fine.finished</div>*/}
      <Button onClick={finePay}>Îןכאעטעü רענאפ</Button>
      {/*    </CardInfo>*/}
      {/*    123123*/}
      {/*  </Card>*/}
      {/*))}*/}
      <Button onClick={getFines}>123</Button>
    </StyledFinesPage>
  );
});

const StyledFinesPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  margin: 25px;
`;
const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
