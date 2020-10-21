import React, { useContext } from "react";
import styled from "styled-components";
import { DataContext } from "../context/DataContext";
export const Profile = () => {
  const { data, account } = useContext(DataContext);
  console.log(data);
  return (
    <StyledProfilePage>
      <Text>
        Eth Account<BoldText> {account}</BoldText>
      </Text>
      <Text>
        FIO<BoldText> {data.FIO}</BoldText>
      </Text>
      <Text>
        licenseid<BoldText> {data.licenseid}</BoldText>
      </Text>
      <Text>
        expire_date<BoldText> {data.expire_date}</BoldText>
      </Text>
      <Text>
        category<BoldText> {data.category}</BoldText>
      </Text>
      <Text>
        exp_start<BoldText> {data.exp_start}</BoldText>
      </Text>
      <Text>
        accidents<BoldText> {data.accidents}</BoldText>
      </Text>
      <Text>
        unpayed_fines<BoldText> {data.unpayed_fines}</BoldText>
      </Text>
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
