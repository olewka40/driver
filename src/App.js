import React, { useCallback, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Driver from "./abis/Driver.json";
import Web3 from "web3";
import { Main } from "./components/Main";
import { DataContext } from "./components/context/DataContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/NavBar";
import { Profile } from "./components/Profile";
import { Registration } from "./components/Registration";
import { Allfunc } from "./components/AllFunc/index";
const App = () => {
  const [driver, setDriver] = useState();
  const [data, setData] = useState([]);
  const [account, setAccount] = useState("");

  const metaMask = useCallback(async () => {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
    console.log("good");
  }, []);

  const loadData = useCallback(async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const netWorkId = await web3.eth.net.getId();
    const netWorkData = Driver.networks[netWorkId];

    if (netWorkData) {
      const driver = new web3.eth.Contract(Driver.abi, netWorkData.address);
      setDriver(driver);
    } else {
      alert("Vse Ploho");
    }
  }, []);

  useEffect(() => {
    metaMask().then((r) => r);
    loadData().then((r) => r);
  }, [metaMask, loadData]);

  const getDriverInfo = useCallback(async () => {
    const driverInfo = await driver.methods.driverInfoTest(account).call();
    const driverInfo1 = await driver.methods.driverInfoTest1(account).call();
    const wfwfwf = await driver.methods.bank_address.call();
    console.log(wfwfwf, 123123);
    setData({
      FIO: driverInfo[0],
      licenseid: driverInfo[1],
      expire_date: driverInfo[2],
      category: driverInfo[3],
      exp_start: driverInfo1[0],
      accidents: driverInfo1[1],
      unpayed_fines: driverInfo1[2],
      insurance_deposit: driverInfo1[3],
    });
  }, [setData, account, driver]);

  return (
    <Router>
      <DataContext.Provider value={{ driver, account, getDriverInfo, data }}>
        <Container>
          <GlobalStyle />
          <Navbar />
          <Switch>
            <Route path="/registration">
              <Registration />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/functions">
              <Allfunc />
            </Route>
            <Route path="/">
              <Main />
            </Route>
          </Switch>
        </Container>
      </DataContext.Provider>
    </Router>
  );
};

export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const GlobalStyle = createGlobalStyle`
  body{ 
  margin: 0;
  height:100vh;
  width:100%;
  }
`;
