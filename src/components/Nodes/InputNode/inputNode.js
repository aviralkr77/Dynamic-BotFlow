import { Button } from "bootstrap";
import { useState, useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";
import "./inputNode.scss";
import InputModal from "../../Modal/InputModal/inputModal";
import {  FaPlusCircle, FaUserEdit} from "react-icons/fa";
import { BsFillQuestionOctagonFill } from "react-icons/bs";
const handleStyle = { left: 10 };


function InputNode({ data  }) {
  const [style, setStyle] = useState({ display: "none" });
  const [showRes, setShowRes] = useState(false);
  const[inputData, setInputData] = useState('')
  const onShowRes = (modType) => {
    setShowRes(true);
  };
  const onCloseRes = () => setShowRes(false);

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);
  const inputHandler =(e)=>{
    const val = e.target.value
    setInputData(val)
  }


  return (
    
        <div className="inputNode">
          <InputModal
        onShowEdit={showRes}
        onCloseEdit={onCloseRes}
        type={'input'}
        data ={inputData}/>
      <Handle type="target" position={Position.Left} id="b" />
      <Handle type="source" position={Position.Right}  id="a"   />
      <div
        onMouseEnter={(e) => {
          setStyle({ display: "block" });
          
        }}
        onMouseLeave={(e) => {
            setTimeout(() => {
                setStyle({ display: "none" });
            }, 3500);
         
        }}
      >
        <button
          className=" btn btn-secondary"
          id="text"
          type="button"
          onChange={onChange}
        >
          <FaUserEdit /> &nbsp;&nbsp;{data.label}
        </button>
      </div>
      <input className="resTitle" placeholder="Title" onChange={(e)=>{inputHandler(e)}} / >
    <div className="editBtn btn btn-light" style={style} onClick={onShowRes}  >Edit</div>
    <button className="addNode btn " style={style} onClick={data.onShow} ><FaPlusCircle/></button>  
   
    </div>
  
  
  );
}

export default InputNode;
