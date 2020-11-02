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
import { Fine } from "./fine";

export const Fines = memo(() => {
  const [fines, setFines] = useState([]);
  const { driver, account } = useContext(DataContext);

  const getFines = useCallback(async () => {
    const finess = await driver.methods.getFinesID().call({ from: account });
    setFines(finess);
    console.log(finess);
  }, [driver, account]);

  return (
    <StyledFinesPage>
      <div>
        <Button onClick={getFines}>Проверить штрафы</Button>
      </div>

      <ListOfFines>
        {fines !== [] ? fines.map((fine) => <Fine fine={fine} />) : null}
      </ListOfFines>
    </StyledFinesPage>
  );
});

const StyledFinesPage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 25px;
`;
const ListOfFines = styled.div`
  display: flex;
  flex-direction: row;
`;
