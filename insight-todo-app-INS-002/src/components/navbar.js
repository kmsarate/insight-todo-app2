import React, { Component } from 'react'
import "../styles/navbar.css";

class Navbar extends Component {
    render() {
        return(
            <nav className="Navbar-Items">
                <h1 className="navbar-logo">To.Do</h1>
            </nav>  
        )
    }
}

export default Navbar;