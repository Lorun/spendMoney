import React from 'react';
import { NavLink } from 'react-router-dom';

import './navigation.css';

export const Navigation = (props) => (
    <nav className="navigation">
        <NavLink to="/transactions" exact activeClassName="is-active" className="navigation-btn">Transactions</NavLink>
        <NavLink to="/transactions/add" className="navigation-btn navigation-btn--add">Add</NavLink>
        <NavLink to="/categories" activeClassName="is-active" className="navigation-btn">Categories</NavLink>
    </nav>
);

export default Navigation;