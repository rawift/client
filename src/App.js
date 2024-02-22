import { Route, Routes, Navigate } from "react-router-dom";

import { useContext, useEffect } from "react";
import Login from "./pages/Login"

import "./App.css"

import ChatList from "./pages/ChatList";
import { Loader } from "./components/Loader/Loader";
import { Icon } from "./components/Icon/Icon";
import Profile from "./pages/Profile";
import OthersProfile from "./pages/OthersProfile";
import { UserContext } from './context/UserContext'
import Form from "./pages/Form";
import Connecting from "./pages/Connecting";
import Bottom from "./components/Bottom/Bottom";
import Info from "./pages/Info";

function App() {	
	return (
		
		<Routes>
			<Route path="login" exact element={<Login />} />
			<Route path="/chatList" exact element={<ChatList />} />
			<Route path="/loader" exact element={<Loader />} />
			<Route path="/icon" exact element={<Icon />} />
			<Route path="/profile" exact element={<Profile/>} />
			<Route path="/othersProfile/:userId" exact element={<OthersProfile />} />
			<Route path="/form" exact element={<Form />} />
			<Route path="/connecting" exact element={<Connecting />} />
			<Route path="/info" exact element={<Info/>} />
		</Routes>
	
	);
}

export default App;
