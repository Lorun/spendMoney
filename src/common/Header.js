import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = (props) => (
    <header>
        <h2>{props.title}</h2>
        <NavLink to="/transactions">Back</NavLink>
    </header>
);

export default Header;