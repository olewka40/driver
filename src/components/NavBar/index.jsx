import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AppBar, Toolbar, IconButton, Popover } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useHistory } from "react-router-dom";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import { DataContext } from "../context/DataContext";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
export const Navbar = () => {
  const [openNot, setOpenNot] = useState(false);
  const [open, setOpen] = useState(false);
  const { getDriverInfo } = useContext(DataContext);
  const history = useHistory();

  const toProfile = () => {
    getDriverInfo();
    history.push("/profile");
    handleDrawerClose();
  };
  const toRegUser = () => {
    history.push("/registration/user");
    handleDrawerClose();
  };
  const toRegLic = () => {
    history.push("/registration/licence");
    handleDrawerClose();
  };
  const toRegVenicle = () => {
    history.push("/registration/venicle");
    handleDrawerClose();
  };
  const toUpdateLic = () => {
    history.push("/registration/update/licence");
    handleDrawerClose();
  };
  const insuranceDeposit = () => {
    history.push("/functions/insuranceDeposit");
    handleDrawerClose();
  };
  const insuranceAccept = () => {
    history.push("/functions/insuranceAccept");
    handleDrawerClose();
  };
  const fineIssue = () => {
    history.push("/functions/fineIssue");
    handleDrawerClose();
  };
  const finePay = () => {
    history.push("/functions/finePay");
    handleDrawerClose();
  };
  const accidentReg = () => {
    history.push("/functions/accidentReg");
    handleDrawerClose();
  };
  const insurancePay = () => {
    history.push("/functions/insurancePay");
    handleDrawerClose();
  };
  const others = () => {
    history.push("/functions/other");
    handleDrawerClose();
  };

  const toHome = () => {
    history.push("/");
  };
  const toggleNotifications = () => {
    setOpenNot(!openNot);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <StyledHeader>
      <AppBar position="static">
        <Toolbar>
          <HeaderContent>
            <RightItems>
              <IconButton
                onClick={toHome}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <HomeIcon />
              </IconButton>
            </RightItems>
            <LeftItems>
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <>
                    <IconButton
                      onClick={toggleNotifications}
                      {...bindTrigger(popupState)}
                      color="inherit"
                    >
                      <NotificationsIcon />
                    </IconButton>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    />
                  </>
                )}
              </PopupState>
              <IconButton onClick={toProfile} color="inherit">
                <AccountCircleIcon />
              </IconButton>
              <IconButton
                onClick={handleDrawerOpen}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </LeftItems>
          </HeaderContent>
        </Toolbar>
      </AppBar>
      <StyledDrawer
        variant="temporary"
        anchor="right"
        open={open}
        style={{ width: 300 }}
      >
        <DrawerHeader>
          <IconButton size="medium" onClick={handleDrawerClose}>
            <ChevronRightIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Text> Выберите Услугу</Text>
        <Divider />
        <ListUslug>
          <ListItem button onClick={toRegUser}>
            <ListItemText>Регистрация Пользователя</ListItemText>
          </ListItem>
          <ListItem button onClick={toRegLic}>
            <ListItemText>Регистрация лицензии</ListItemText>
          </ListItem>
          <ListItem button onClick={toRegVenicle}>
            <ListItemText>Регистрация Транспорта </ListItemText>
          </ListItem>
          <ListItem button onClick={toUpdateLic}>
            <ListItemText>Обновить лицензию </ListItemText>
          </ListItem>
          <ListItem button onClick={insuranceDeposit}>
            <ListItemText>insuranceDeposit</ListItemText>
          </ListItem>
          <ListItem button onClick={insuranceAccept}>
            <ListItemText>insuranceAccept </ListItemText>
          </ListItem>
          <ListItem button onClick={fineIssue}>
            <ListItemText>fineIssue </ListItemText>
          </ListItem>
          <ListItem button onClick={finePay}>
            <ListItemText>finePay </ListItemText>
          </ListItem>
          <ListItem button onClick={accidentReg}>
            <ListItemText>accidentReg </ListItemText>
          </ListItem>
          <ListItem button onClick={insurancePay}>
            <ListItemText>insurancePay</ListItemText>
          </ListItem>
          <ListItem button onClick={others}>
            <ListItemText>Другие функции </ListItemText>
          </ListItem>
        </ListUslug>
      </StyledDrawer>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  width: 100%;
`;
const RightItems = styled.div``;
const LeftItems = styled.div``;
const ListUslug = styled(List)``;
const Text = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: normal;
  font-size: 24px;
`;
const HeaderContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paperAnchorRight {
    width: 250px;
  }
`;
const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
