import React from "react";
import { Nav } from "react-bootstrap";
import './sidenav.scss'

const SideNav = () => {
  return (
    <div className="position-absolute   py-4">
      <Nav defaultActiveKey="/stories" className="flex-column ">
        <h4>CREATE</h4>
        
        <Nav.Link className="sub_header" href="/stories"><b>Stories</b></Nav.Link>
        <div className="sub_menu">
        <Nav.Link eventKey="link-1">Live Chat</Nav.Link>
        <Nav.Link eventKey="link-2">Slack</Nav.Link>
        <Nav.Link eventKey="link-1">facebook</Nav.Link>
        <Nav.Link eventKey="link-2">Chat widget</Nav.Link>
        </div>
        <br/>
        <Nav.Link className="sub_header" href="/template"><b>Templates</b></Nav.Link>
        <div className="sub_menu">
        <Nav.Link eventKey="link-1">Featured</Nav.Link>
        <Nav.Link eventKey="link-2">Basic</Nav.Link>
        <Nav.Link eventKey="link-1">Automation</Nav.Link>
        </div>
        
       
      </Nav>
    </div>
  );
};

export default SideNav;
