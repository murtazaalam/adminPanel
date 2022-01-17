import React from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import Login from './Login/Login';
import Home from './Home/Home';

const Routing = () => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={Login}></Route>
            <Route path="/admin-panel" component={Home}>
            </Route>
        </BrowserRouter>
    )
}
export default Routing;