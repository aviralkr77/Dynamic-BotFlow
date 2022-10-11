import { Button } from 'bootstrap';
import { useCallback , useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import './staticNode.scss'
import InputModal from "../../Modal/InputModal/inputModal";
import {  FaPlusCircle, FaUserEdit} from "react-icons/fa";
import { MdHome } from "react-icons/md";

function StaticNode({ data }) {
  const [style, setStyle] = useState({ display: "none" });
  const [showRes, setShowRes] = useState(false);

  const [formData, setFormData] = useState({
    nodeID:data.nodeID,
    nextNode:[],
    head:true,
    tail:false,
    type:"intent",
    title:"",
    message :"",
  })
  


  const onShowRes = () => {
    setShowRes(true);
    localStorage.setItem('nodeID', data.nodeID);
  };

  const onCloseRes = () => {setShowRes(false) ;localStorage.removeItem("nodeID");};

  const onSave = ()=>{
  
    let currentNode = localStorage.getItem("nodeID");
      data.setNodeData(nodes => {
        // find if match exists
        
        if(nodes){
          
          const match = nodes.find(node =>  node.nodeID === currentNode);
          console.log(match);
          if (match) {
            // match found, map array
            return nodes.map(node => node.nodeID === currentNode
              ? {...node ,
                nodeID:node.nodeID,
                head:formData.head,
                tail:formData.tail,
                title:formData.title,
                message:formData.message
              }
              : node
            );
          }
        }
        
        return nodes.concat( formData );
        
        
      });
    
    
   
    onCloseRes();
    
  }



  return (
    
        <div className="staticNode">
          <InputModal
        onShowEdit={showRes}
        onCloseEdit={onCloseRes}
        onSave={onSave}
        type={'input'}
        title={formData.title}
        message={formData.message}
        setFormData={setFormData}
        />
     
      <Handle type="source" position={Position.Right}  id="a"   />
      <div
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
          
        }}
        onMouseLeave={(e) => {
            setTimeout(() => {
                setStyle({ display: "none" });
            }, 4000);
         
        }}
      >
        <button
          className=" btn btn-secondary"
          id="text"
          type="button"
          
        >
          <MdHome /> &nbsp;&nbsp;Start
        </button>
      </div>
      
    <div className="editBtn btn btn-light" style={style} onClick={onShowRes}  >Edit Message</div>
    <button className="addNode btn " style={style} onClick={data.onShow} ><FaPlusCircle/></button>  
   
    </div>
  );
}

export default StaticNode
