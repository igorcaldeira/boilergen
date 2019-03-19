import React from "react"
import HeaderLogged from "../header/headerLogged/HeaderLogged";
import './ContentLogged.scss';

class ContentLogged extends React.PureComponent {

    render() {
        return (
            <div>
                <HeaderLogged/>
                {this.props.children}
            </div>
        );
    }
}

export default ContentLogged;