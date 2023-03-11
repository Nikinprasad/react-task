import "./App.css";
import * as React from "react";
import ViewImage from "./pages/ViewImage";
import { Route, BrowserRouter, Routes, useNavigate } from "react-router-dom";
// import AddImage from "./pages/AddImage";
import NotFound from "./pages/404";
import ListAppointment from "./pages/ListAppointment";
import CreateAppointment from "./pages/CreateAppointment";
import EditAppointment from "./pages/EditAppointment";
import RegisterUser from "./pages/register/register";
import Login from "./pages/login/login";

import Header from "./layout/Layout"

import { ArrowBackIosNew, Logout } from "@mui/icons-material";
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';


import { IconButton } from "@mui/joy";
import { useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import { deepmerge } from "@mui/utils";
import { experimental_extendTheme as extendMuiTheme } from "@mui/material/styles";
import {
  extendTheme as extendJoyTheme,
  CssVarsProvider,
} from "@mui/joy/styles";

const muiTheme = extendMuiTheme();
const joyTheme = extendJoyTheme();
const theme = deepmerge(muiTheme, joyTheme);

function ColorSchemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="md"
      variant="solid"
      color="neutral"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <CssVarsProvider
        defaultMode="system"
        theme={theme}
      >
        <Header align="right">

          {
            ((window.location.pathname == "/") || (window.location.pathname == "/register")) ? ""
              :

              <IconButton
                size="md"
                variant="solid"
                color="danger"
                onClick={() => { localStorage.removeItem("user"); navigate("/") }}
              >
                <Logout />
              </IconButton>
          } <ColorSchemeToggle />
        </Header>
        {/* {
          ((window.location.pathname == "/add") || (window.location.pathname.startsWith("/edit"))) ?
            <Header align="left">
              <IconButton
                size="md"
                variant="solid"
                color="primary"
                onClick={() => { navigate(-1) }}
              >
                <ArrowBackIosNew />
              </IconButton>
            </Header> : ""
        } */}
        <div className="App-header">
          <Routes>
            <Route index element={<Login />} />
            <Route path="register" element={<RegisterUser />} />
            <Route path="list/:id" element={<ListAppointment />} />
            <Route path="add" element={<CreateAppointment />} />
            <Route exact path="edit/:id" element={<EditAppointment />} />
            <Route path="image" element={<ViewImage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

        </div>
      </CssVarsProvider>
    </div >

  );
}

export default App;
