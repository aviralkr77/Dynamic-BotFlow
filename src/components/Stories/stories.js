import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/sidenav";
import "./stories.scss";
import { FaPlusCircle , FaRobot } from "react-icons/fa";
import { IconContext } from "react-icons";
import image from './bg.jpg'
import CreateBotModal from '../Modal/CreateBotModal/createBotModal'
import Dialog from "../Modal/Dialog/dialog";


const Stories = () => {


  const [show, setShow] = useState(false);

  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  return (
    <>
    <Dialog/>
    <CreateBotModal onShowMod={show} onCloseMod={onClose} />
      <div className="container " style={{ backgroundImage:`url(${image})` }}>
        <div class="d-flex flex-row">
          <div class="p-2">
            <SideNav></SideNav>
            
          </div>
          <div class="p-2 story text-black">
            <h4>All Stories</h4>
            <div class="d-flex flex-row">
              <div className="  text-blue story_block ">
                <div className="inner_block">
                  <div>  <IconContext.Provider
                    value={{ size: "2em", className: "add_avg" }}
                  >
                   <a  onClick={onShow}><FaPlusCircle /></a> 
                  </IconContext.Provider></div>
                
                  <div >Create a Bot</div>
                  
                </div>
              </div>
              <div className="  text-blue story_block_2 ">
                <div className="inner_block">
                  <div>  <IconContext.Provider
                    value={{ size: "2em", className: "add_avg" }}
                  >
                   <a  href="/chatflow"><FaRobot /></a> 
                  </IconContext.Provider></div>
                
                  <div>DemoBot</div>
                  
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
        
      </div>
      
    </>
  );
};

export default Stories;
