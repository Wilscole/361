import React from 'react';
import { Link } from 'react-router-dom';


function Navigation() {
    return (
        <nav>
            <Link to="/">My Budgets</Link>
            <Link to="../add-budget">Create Budget</Link>
            <Link to="../faq">FAQ</Link>
            <Link to="../about">About</Link>
            <Link to="../view-api">API</Link>
        </nav>
    );
}

export default Navigation;