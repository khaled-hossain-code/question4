import "bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import { Router, Route, Redirect } from "react-router-dom"
import HomePage from "./pages/Home"
import PostsPage from "./pages/Posts"
import CategoriesPage from "./pages/Categories"
import { createBrowserHistory as createHistory } from "history"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import "./App.css"

const history = createHistory()

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Navbar bg="primary" expand="lg" variant="dark">
          <Navbar.Brand href="#home">Address Book App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/posts">Posts</Nav.Link>
              <Nav.Link href="/categories">Categories</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Route path="/" exact component={HomePage} />
        <Route path="/posts" exact component={PostsPage} />
        <Route path="/categories" exact component={CategoriesPage} />
      </Router>
    </div>
  )
}
export default App
