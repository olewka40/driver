import React, { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../context/DataContext";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export const Profile = () => {
  const history = useHistory();
  const { data, account } = useContext(DataContext);
  const toFines = () => {
    history.push("/fines");
  };
  return (
    <StyledProfilePage>
      <Text>
        ������� ���� :<BoldText> {account}</BoldText>
      </Text>
      <Text>
        ���<BoldText> {data.FIO}</BoldText>
      </Text>
      <Text>
        ����� ��������<BoldText> {data.licenseid}</BoldText>
      </Text>
      <Text>
        ����� ��<BoldText> {data.expire_date}</BoldText>
      </Text>
      <Text>
        ���������<BoldText> {data.category}</BoldText>
      </Text>
      <Text>
        ������ ��������<BoldText> {data.exp_start}</BoldText>
      </Text>
      <Text>
        accidents<BoldText> {data.accidents}</BoldText>
      </Text>
      <Text>
        ���������� ����������� �������<BoldText> {data.unpayed_fines}</BoldText>
      </Text>
      <Text>
        ��������� ���
        <BoldText>
          {data.dps ? <BoldText>��</BoldText> : <BoldText>���</BoldText>}
        </BoldText>
      </Text>
      {data.unpayed_fines > 0 && (
        <Button onClick={toFines} variant="contained" color="primary">
          ����������� ������
        </Button>
      )}
    </StyledProfilePage>
  );
};

const StyledProfilePage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Text = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 16px;
  margin: 10px;
`;
const BoldText = styled.div`
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin: 10px;
`;
