import React, { Component } from 'react'
import "../styles/navbar.css";
import "../styles/home.css";

class Navbar extends Component {
  render() {
      return(
          <nav className="Navbar-Items">
              <h1 className="navbar-logo">To.Do</h1>
          </nav>  
      )
  }
}

function Home() {
  return (
    <>
      <h1>Login Successfully</h1>
    </>
  );
}

export default Home;