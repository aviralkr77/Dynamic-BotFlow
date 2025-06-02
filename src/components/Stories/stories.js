import React, { useEffect, useState } from "react";
import SideNav from "../SideNav/sidenav";
import "./stories.scss";
import { FaPlusCircle, FaRobot } from "react-icons/fa";
import { IconContext } from "react-icons";
import image from "./bg.jpg";
import CreateBotModal from "../Modal/CreateBotModal/createBotModal";
import Dialog from "../Modal/Dialog/dialog";
import Card from "react-bootstrap/Card";
import CardGroup from 'react-bootstrap/CardGroup';
import axios from "axios";
import Button from "react-bootstrap/Button";

const Stories = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(5);
const customerComments = [
  "Loved how easy it was to build a chatbot with drag and drop!",
  "Dialogflow integration worked like a charm — very smooth!",
  "The interface is super intuitive, even for beginners.",
  "I created a fully functional bot in under 10 minutes. Amazing!",
  "Pre-built templates saved me a lot of time.",
  "The drag-and-drop flow builder is a game changer.",
  "Really impressed with how customizable the chatbot behavior is.",
  "Support for Dialogflow CX is a big plus!",
  "No coding needed — perfect for non-tech teams.",
  "The real-time preview helped me test and iterate quickly."
];
function getRandomComments(count = 2) {
  // Make a copy of the array
  const shuffled = [...customerComments];
  // Shuffle it using Fisher-Yates algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // Return the first `count` elements (e.g., 4 unique comments)
  return shuffled.slice(0, count);
}
  const handleNext = () =>{
   setCurrentPage((prevPage) => prevPage + 5);
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `https://randomuser.me/api/?page=${currentPage}&results=4&seed=abc`
        );
        const Users = response.data.results.map((user) => ({
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          picture: user.picture.large,
          date: new Date(user.registered.date).toLocaleDateString(),
        }));
        setUsers(Users);
        setIsLoading(false);
        console.log(response.data.results);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    getUsers();
  }, [currentPage]);

  const [show, setShow] = useState(false);
  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  return (
    <>
      <Dialog />
      <CreateBotModal onShowMod={show} onCloseMod={onClose} />
      <div className="main_container" style={{ backgroundImage:`url(${image})` }}>
        <div className="d-flex flex-row">
          <div class="p-2">
            <SideNav></SideNav>
          </div>
          <div class="p-2 story text-black">
            <h4>All Stories</h4>
            <div class="d-flex flex-row">
              <div className="  text-blue story_block ">
                <div className="inner_block">
                  <div>
                    {" "}
                    <IconContext.Provider
                      value={{ size: "2em", className: "add_avg" }}
                    >
                      <a onClick={onShow}>
                        <FaPlusCircle />
                      </a>
                    </IconContext.Provider>
                  </div>

                  <div>Create a Bot</div>
                </div>
              </div>
              <div className="  text-blue story_block_2 ">
                <div className="inner_block">
                  <div>
                    {" "}
                    <IconContext.Provider
                      value={{ size: "2em", className: "add_avg" }}
                    >
                      <a href="/chatflow">
                        <FaRobot />
                      </a>
                    </IconContext.Provider>
                  </div>

                  <div>DemoBot</div>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
        <CardGroup
        >
           <Button className="btnCustom" onClick={()=>setCurrentPage(prev=> prev-1)}>&lt;</Button>
          {isLoading ? (
            <p>loading ...</p>
          ) : (
            users.map((user, index) => (
              <Card
        style={{borderRadius: "5px", border:"3px solid #e67300"}} className="cardCustom" key={index}>
                <Card.Img variant="top" src={user.picture} />
                <Card.Body style={{background: "black"}}>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text>
                    <p>Added: {user.date}</p>
                    <p>{getRandomComments()}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          )}
          <Button className="btnCustom"  onClick={handleNext}>&gt;</Button>
        </CardGroup>
      </div>
    </>
  );
};

export default Stories;
