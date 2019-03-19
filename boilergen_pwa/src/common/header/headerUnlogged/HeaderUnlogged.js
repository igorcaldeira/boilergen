import React from "react";
import { Link } from "react-router-dom";
import * as routers from "../../../constants/routers";

class HeaderUnlogged extends React.PureComponent {

    render() {
        return (
            <div>
                <Link to={routers.ROOT}>Login</Link>&nbsp;
                <Link to={routers.LOGOUT}>Logout</Link>
            </div>
        );
    }
}

export default HeaderUnlogged;