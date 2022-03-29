import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./Home";
import TopBar from "./TopBar/TopBar";
import React from "react";
import PrivateRoute from "./utils/PrivateRoute";
import Reward from "./User/Reward";

function App() {

    return (
        <React.Fragment>
            <TopBar />
            <div className="h-1rem" />
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="*" element={<Navigate to="/" />}/>
                <Route path="/reward" element={<PrivateRoute><Reward /></PrivateRoute>}/>
            </Routes>
        </React.Fragment>
    );
}

export default App;