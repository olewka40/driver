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
        FIO<BoldText> {data[0]}</BoldText>
      </Text>
      <Text>
        licenseid<BoldText> {data[1]}</BoldText>
      </Text>
      <Text>
        expire_date<BoldText> {data[2]}</BoldText>
      </Text>
      <Text>
        category<BoldText> {data[3]}</BoldText>
      </Text>
      <Text>
        exp_start<BoldText> {data[4]}</BoldText>
      </Text>
      <Text>
        accidents<BoldText> {data[5]}</BoldText>
      </Text>
      <Text>
        unpayed_fines<BoldText> {data[6]}</BoldText>
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
