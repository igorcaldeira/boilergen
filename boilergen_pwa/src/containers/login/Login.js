import React from 'react'
import ContentUnlogged from "../../common/contentUnlogged/ContentUnlogged";
import FormLogin from "./form/FormLogin";
import HeaderUnlogged from "../../common/header/headerUnlogged/HeaderUnlogged";

const Login = () => (
    <ContentUnlogged>
        <HeaderUnlogged/>
        <FormLogin/>
    </ContentUnlogged>
);

export default Login
