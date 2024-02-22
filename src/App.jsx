import NavBar from "./components/Navbar";
import Users from "./components/Users";
import React from 'react';
import { UsersProvider } from "./context-api/UsersContext";

const App = () => {
  return (
    <UsersProvider>
      <NavBar></NavBar>
      <Users></Users>
    </UsersProvider>
  );
};

export default App;