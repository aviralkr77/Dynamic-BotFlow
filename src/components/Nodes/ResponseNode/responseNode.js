import { useState, useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";
import ResponseModal from "../../Modal/ResponseModal/responseModal";
import "./responseNode.scss";
import { FaTelegramPlane } from "react-icons/fa";


function ResponseNode({ data  }) {
  const [style, setStyle] = useState({ display: "none" });
  const [showRes, setShowRes] = useState(false);


const [formData, setFormData] = useState({

  nodeID:data.nodeID,
  nextNode:[],
  head:false,
  tail:false,
  type:"intent",
  title:"",
  buttonData :[] ,
  keywords : [],
  message :"",
  userResponseType :"Select validation"

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
          console.log("length",nodes.length);
          if (match) {
            // match found, map array
            return nodes.map(node => node.nodeID === currentNode
              ? {...node ,
                nodeID:node.nodeID,
                head:formData.head,
                tail:formData.tail,
                title:formData.title,
                buttonData :formData.buttonData ,
                keywords :formData.keywords,
                message :formData.message,
                userResponseType :formData.userResponseType
              }
              : node
            );
          }
        }
        
        return nodes.concat( formData );
        
        
      });
    
    
   
    onCloseRes();
    
  }


  const onChange = useCallback((evt) => {

  }, []);

  return (

    <div className="resNode">
      <ResponseModal 
        onShowEdit={showRes}
        onCloseEdit={onCloseRes}
        onSave={onSave}
        title={formData.title}
        buttonData={formData.buttonData}
        keywords={formData.keywords}
        message={formData.message}
        userResponseType={formData.userResponseType}
        setFormData={setFormData} />


      <Handle type="target" position={Position.Left} id="b" />
      <Handle type="source" position={Position.Right} id="a" />
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
          <FaTelegramPlane />&nbsp;&nbsp;{(formData.title)?formData.title:"BOT MESSAGE"}
        </button>
      </div>
      
      <div className="editBtn btn btn-light" style={style} onClick={onShowRes} >Edit Message</div>

    </div>


  );
}

export default ResponseNode;
