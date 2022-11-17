import { React, Fragment, useState, useEffect } from "react";
import Home from "./Components/Home";
import Navbar from "./Components/Nav/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./Components/api/Register";
import PrivateRoute from "./Components/PrivateRoute";
import Login from "./Components/api/Login";
import socketIO from "socket.io-client";
import PrivateChat from "./Components/Chat/PrivateChat";
import { getUsers } from "./Components/api/UserApi";
import { Box } from "@chakra-ui/react";
import { CheckLogin } from "./Components/api/auth";
import Settings from "./Components/Settings/Settings";
import ChangePassword from "./Components/Settings/ChangePassword";
import UpdateProfile from "./Components/Settings/UpdateProfile";

function App() {
  const [users, setUsers] = useState();
  const socket = socketIO.connect("http://localhost:4000");

  useEffect(() => {
    const getUsersList = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    getUsersList();
  }, []);

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages(data));
  }, [socket, messages]);
  return (
    <Fragment>
      <Navbar socket={socket} users={users} />
      <Box h="100vh" w={"full"}>
        <Routes>
          <Route
            path={"/"}
            index
            element={
              <PrivateRoute>
                {users && (
                  <Home messages={messages} socket={socket} users={users} />
                )}
              </PrivateRoute>
            }
          />
          <Route
            path="/chat/:user"
            element={
              <PrivateRoute>
                {users && <PrivateChat socket={socket} users={users} />}
              </PrivateRoute>
            }
          />
          <Route
            path={"/login"}
            element={CheckLogin() ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path={"/register"}
            element={CheckLogin() ? <Navigate to={"/"} /> : <Register />}
          />
          <Route
            path={"/settings"}
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path={"/settings/changePassword"}
            element={
              <PrivateRoute>
                <ChangePassword />
              </PrivateRoute>
            }
          />
          <Route
            path={"/settings/updateProfile"}
            element={
              <PrivateRoute>
                <UpdateProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Box>
    </Fragment>
  );
}

export default App;
