
import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { IoTriangleSharp } from 'react-icons/io5';
// import {ReactComponent as Logo} from './logo.png';
import './sidebar.scss'

const Sidebar = () => {
    return (
      <div className='sidebar' style={{ height: '100vh', overflow: 'scroll initial' }}>
        <CDBSidebar  textColor="#fff" backgroundColor="#372598;">
        <CDBSidebarHeader   style={{color:"#BF1D2B", backgroundColor:"white" , borderRight:"1px solid #372598"
              }} prefix={<i className="smallIcon fa fa-lg" ><IoTriangleSharp/></i>}>
            <a  href="/" className="icon  text-decoration-none" style={{ color: 'BLUE',}}>
            {/* <Logo /> */}
            LOGO
            </a>
          </CDBSidebarHeader>
        
  
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/stories" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="random" >Stories</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/chatflow" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">Chatflow</CDBSidebarMenuItem>
              </NavLink>
            
              <NavLink exact to="/analytics" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="chart-line">Analytics</CDBSidebarMenuItem>
              </NavLink>
  
              <NavLink exact to="/404" target="_blank" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="exclamation-circle">About Us</CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
  
          <CDBSidebarFooter>
            <div
              style={{
                padding: '20px 5px',
              }}
            >
               <NavLink exact to="/profile" activeClassName="activeClicked">
                <CDBSidebarMenuItem style={{color:'white'}} icon="user">Profile</CDBSidebarMenuItem>
              </NavLink>
            </div>
          </CDBSidebarFooter>
        </CDBSidebar>
      </div>
    );
  };
  
  export default Sidebar;
  