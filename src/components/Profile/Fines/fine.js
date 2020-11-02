import React, { memo, useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import Card from "@material-ui/core/Card";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { StyledSelect } from "../../Registration/RegLic";
import MenuItem from "@material-ui/core/MenuItem";

export const Fine = memo(({ fine }) => {
  const { driver, account, getDriverInfo, data } = useContext(DataContext);
  const [fineStatus, setFineStatus] = useState();
  const [value, setValue] = useState(5);
  console.log(data.licenseid);
  const finePay = async () => {
    await driver.methods
      .finePay(data.licenseid, parseInt(fine))
      .send({ from: account, value: value });
  };
  const getFineByID = async () => {
    getDriverInfo();
    const oneFine = await driver.methods.getFine(parseInt(fine)).call();
    console.log(oneFine);

    setFineStatus(oneFine[1]);
  };
  useEffect(() => {
    getFineByID().then((r) => r);
  }, []);
  return (
    <FineContainer>
      <StyledCard>
        <CardInfo>
          <PayNumber>Штраф №{fine}</PayNumber>

          {fineStatus === true ? (
            <b> Оплачен</b>
          ) : (
            <div>
              <StatusCheck>
                <Button onClick={getFineByID}>Проверить статус оплаты</Button>
              </StatusCheck>
              <StyledSelect
                styled={{ height: 40, width: 223 }}
                label="Цена"
                value={value}
                required={true}
                variant="outlined"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              >
                <MenuItem value={5}>Цена 5 Эфиров</MenuItem>
                <MenuItem value={10}>Цена 10 эфиров </MenuItem>
              </StyledSelect>
              <Text>Не оплачен</Text>
              <Button onClick={finePay}>Оплатить штраф</Button>
            </div>
          )}
        </CardInfo>
      </StyledCard>
    </FineContainer>
  );
});
const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const PayNumber = styled.div``;
const StatusCheck = styled.div``;
const Text = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledCard = styled(Card)`
  width: 250px;
  height: 200px;
`;
const FineContainer = styled.div`
  display: flex;
  flex-direction: row;
  > div {
    margin: 10px;
  }
`;
