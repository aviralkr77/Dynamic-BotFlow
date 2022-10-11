import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Navigation() {
return (
<Navbar collapseOnSelect sticky='top' bg="dark" variant="dark" expand="lg">
  <Navbar.Brand href="/home">DigiBot</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav>
      <Nav.Link href="/create">Create</Nav.Link>
      <Nav.Link href="/list">Collection</Nav.Link>
    

    </Nav>
  </Navbar.Collapse>
</Navbar>
)
}
export default Navigation