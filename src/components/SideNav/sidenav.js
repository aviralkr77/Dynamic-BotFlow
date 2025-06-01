import React from "react";
import { Nav } from "react-bootstrap";
import './sidenav.scss'
import { IoLogoFacebook } from "react-icons/io5";
import { IoLogoInstagram } from "react-icons/io5";
import { IoLogoWhatsapp } from "react-icons/io5";
const SideNav = () => {
  return (
    <div className="position-absolute   py-4">
      <Nav defaultActiveKey="/stories" className="flex-column ">
        <h4>CREATE</h4>
        
        <Nav.Link className="sub_header" href="/stories"><b>Stories</b></Nav.Link>
        <div className="sub_menu">
        <Nav.Link eventKey="link-1">Live Chat</Nav.Link>
        <Nav.Link eventKey="link-2">Chat widget</Nav.Link>
        </div>
        <br/>
        <Nav.Link className="sub_header" href="/template"><b>Connect</b></Nav.Link>
        <div className="sub_menu">
        <Nav.Link eventKey="link-1"><i className="smallIcon fa fa-lg" ><IoLogoFacebook/></i></Nav.Link>
        <Nav.Link eventKey="link-2"><i className="smallIcon fa fa-lg" ><IoLogoInstagram/></i></Nav.Link>
        <Nav.Link eventKey="link-1"><i className="smallIcon fa fa-lg" ><IoLogoWhatsapp/></i></Nav.Link>
        </div>
        
       
      </Nav>
    </div>
  );
};

export default SideNav;
