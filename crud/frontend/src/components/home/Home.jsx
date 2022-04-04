import React from "react";
import Main from '../templates/Main'
import logo from '../../assets/images/logo.png'
import { Link } from 'react-router-dom'


export default props =>
    <Main title="" subtitle="Sistema para cadastro de Agricultores!">
        <Link to="/" className="logo">
            <img src={logo} alt="logo" />
        </Link>
    </Main>