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
    const fine = await driver.methods.getFine(1).call();
    console.log(fine);
    const finess = await driver.methods.getFinesID().call({ from: account });
    finess.forEach(async (fine) => {
      const fin = await driver.methods.getFine(fine).call();

      setFines(...fines, {
        id: fin.id,
        finished: fin.id
      });
    });
    console.log(finess);
  }, [driver, account]);

  const finePay = async (id) => {
    const driverInfo = await driver.methods.driverInfoTest(account).call();

    await driver.methods.finePay(driverInfo[1], finePay(id)).call();
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
      {/*      <Button onClick={finePay(fine.id)}>Îןכאעטעü רענאפ</Button>*/}
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
