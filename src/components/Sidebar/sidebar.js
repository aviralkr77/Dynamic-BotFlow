
import React,{useState} from 'react';
import {CDBSidebar,CDBSidebarContent,CDBSidebarFooter,CDBSidebarHeader,CDBSidebarMenu,CDBSidebarMenuItem} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { IoBoatOutline } from 'react-icons/io5';
import './sidebar.scss'
import Dialog from "../Modal/Dialog/dialog";

const Sidebar = () => {
const [show, setShow] = useState(false);
const [isOpen, setIsOpen] = useState(false);
 
    return (
      <div className='sidebar'>
        <CDBSidebar toggled={isOpen}  textColor="black" backgroundColor="#e67300;">
        <CDBSidebarHeader toggled={true}  style={{color:"white", backgroundColor:"black" , borderRight:"2px dashed #e67300",borderBottom:"2px dashed #e67300"
              }} prefix={<i className="smallIcon fa fa-lg" ><IoBoatOutline/></i>}>
            <a  href="/" className="icon  text-decoration-none" style={{ color: 'white',}}>
            DYNAMIC-FLOW
            </a>
          </CDBSidebarHeader>
        
  
          <CDBSidebarContent style={{color:"white" , borderRight:"2px dashed black"}} className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/stories" activeClassName="activeClicked" onClick={()=>setIsOpen(!isOpen)}>
                <CDBSidebarMenuItem icon="random" >Stories</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/chatflow" activeClassName="activeClicked" onClick={()=>setIsOpen(!isOpen)}>
                <CDBSidebarMenuItem icon="table">Chatflow</CDBSidebarMenuItem>
              </NavLink>
            
              <NavLink exact to="/analytics" activeClassName="" onClick={()=>setIsOpen(!isOpen)}>
                <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
              </NavLink>
  
              <NavLink exact to="/404" target="_blank" activeClassName="">
                <CDBSidebarMenuItem icon="exclamation-circle">About Us</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
  
          <CDBSidebarFooter style={{color:"white" , borderRight:"2px dashed black",borderTop:"2px dashed black"}}>
            <div
              style={{
                padding: '20px 5px',
              }}
            >
             
                <CDBSidebarMenuItem onClick={()=>setShow(true)} icon="user">Login</CDBSidebarMenuItem>
              
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
              <Dialog show={show} onHide={() => setShow(false)} />
        
      </div>
    );
  };
  
  export default Sidebar;
  