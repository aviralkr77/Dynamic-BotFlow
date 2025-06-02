import { useState, useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";
import "./questionNode.scss";
import ResponseModal from "../../Modal/QuestionModal/questionModal";
import {
  FaPlusCircle,
} from "react-icons/fa";
import {
  BsFillQuestionOctagonFill,
} from "react-icons/bs";

function QuestionNode({ data }) {
  const [style, setStyle] = useState({ display: "none" });
  const [showRes, setShowRes] = useState(false);
  const [inputData, setInputData] = useState("");


  const [formData, setFormData] = useState({
    buttonData :" " ,
    questionData : " ",
    responseData :" ",
    validRes :" ",
    invalidRes :" ",
  })

  const onShowRes = (modType) => {
    setShowRes(true);
  };
  const onCloseRes = () => setShowRes(false);

  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  const inputHandler = (e) => {
    const val = e.target.value;
    setInputData(val);
  };

  return (
    <div className="quesNode">
      <ResponseModal
        onShowEdit={showRes}
        onCloseEdit={onCloseRes}
        type={"question"}
        data={inputData}
        buttonData={formData.buttonData}
        questionData={formData.questionData}
        responseData={formData.responseData}
        validRes={formData.validRes}
        invalidRes={formData.invalidRes}
        setFormData={setFormData}
      />
       <Handle type="source" position={Position.Right} id="a" />
      <Handle type="target" position={Position.Left} id="b" />
      <Handle type="source" position={Position.Bottom} id="c" />
      <Handle type="source" position={Position.Top} id="d" />
     
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
          <BsFillQuestionOctagonFill /> &nbsp;&nbsp;{data.label}
        </button>
      </div>
      <input
        className="resTitle"
        placeholder="Title"
        onChange={(e) => {
          inputHandler(e);
        }}
      />
      <div className="editBtn btn btn-light" style={style} onClick={onShowRes}>
        Edit
      </div>
      <button className="addNode btn " style={style} onClick={data.onAdd}>
        <FaPlusCircle />
      </button>
    </div>
  );
}

export default QuestionNode;
