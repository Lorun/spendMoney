import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = (props) => (
    <header>
        Title
        <NavLink to="/transactions" exact activeClassName="is-active">Transactions</NavLink>
        <NavLink to="/transactions/add">Add</NavLink>
        <NavLink to="/categories" activeClassName="is-active">Categories</NavLink>
    </header>
);

export default Header;