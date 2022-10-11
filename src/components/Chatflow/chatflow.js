import React, {
  useState,
  useEffect,
  useCallback,
  useRef
} from "react";
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
  Controls,
  Background,
  MiniMap,
  ControlButton,
  getConnectedEdges,
  applyNodeChanges,
} from "react-flow-renderer";
import { FaPlus } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import "./chatflow.scss";
import { BsArrowClockwise, BsSave } from "react-icons/bs";
import { RiSendPlane2Fill } from "react-icons/ri";

import StaticNode from "../Nodes/StaticNode/staticNode";
import Fallback from "../Nodes/FallbackNode/fallbackNode";
import ResponseNode from "../Nodes/ResponseNode/responseNode";
import QuestionNode from "../Nodes/QuestionNode/questionNode";
import InputNode from "../Nodes/InputNode/inputNode";
import EditModal from "../Modal/EditModal/editModal";
import { Card } from "react-bootstrap";

let id = 3;
const getId = () => `nodeID-${id++}`;
const flowKey = "DRP-flow";

//Mini-map Node Style
const nodeColor = (node) => {
  switch (node.type) {
    case "inputNode":
      return "grey";
    case "resNode":
      return "#9B92CB";
    case "quesNode":
      return "#D8747D";
    case "staticNode":
      return "#372598";
    case "fbNode":
      return "#C02E31";
    default:
      return "white";
  }
};

//Custom Node Types
const nodeTypes = {
  staticNode: StaticNode,
  fbNode: Fallback,
  resNode: ResponseNode,
  quesNode: QuestionNode,
  inputNode: InputNode,
};

const Chatflow = () => {
  // Data instances

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [clickedElement, setClickedElement] = useState([]);

  const [nodeData, setNodeData] = useState([]);

  // React Flow Callback Methods

  const onAdd = useCallback(() => {
    const newNode = {
      id: getId(),
      type: "resNode",
      data: { label: "Bot response" },
      position: {
        x: 600,
        y: -100,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, []);

  const onShow = () => setShow(true);
  const onClose = () => setShow(false);

  //React Flow Default ViewPort
  const { setViewport, zoomIn, zoomOut } = useReactFlow();
  setViewport({ x: 100, y: 280, zoom: 1 }, { duration: 800 });

  //Component Mount

  useEffect(() => {
    const titleData = localStorage.getItem("Title");
    setTitle(titleData);

    setNodes([
      {
        id: "nodeID-1",
        sourcePosition: "right",
        type: "staticNode",
        className: "dark-node",
        data: {
          onShow: onShow,
          onClose: onClose,
          label: "Start Point",
          onClose: onClose,
          setNodeData: setNodeData,
          nodeID: "nodeID-1",
        },
        position: { x: 0, y: 80 },
      },
      {
        id: "nodeID-2",
        sourcePosition: "right",
        type: "resNode",
        targetPosition: "left",
        data: {
          onAdd: onAdd,
          onShow: onShow,
          onClose: onClose,
          label: "Bot response",
          setNodeData: setNodeData,
          nodeID: "nodeID-2",
        },
        position: { x: 250, y: 80 },
      },
    ]);

    setEdges([
      {
        id: "horizontal-e1-2",
        source: "nodeID-1",
        type: "default",
        target: "nodeID-2",
        animated: true,
      },
    ]);
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onSave = useCallback(() => {
    if (reactFlowInstance) {
      const flow = reactFlowInstance.toObject();

      // console.log(typeof flow);
      Object.entries(flow).map((entry) => {
        let key = entry[0];
        let value = entry[1];
        if (key == "edges") {
          value.map((res) => {
            setNodeData((nodes) => {
              // find if match exists

              if (nodes) {
                const match = nodes.find((node) => node.nodeID === res.source);

                if (match) {
                  // match found, map array
                  let arr = []
                  return nodes.map((node) =>
                    
                  //condition to be fixed- adding data to next node on every onSave call
                    node.nodeID === res.source
                      ? { ...node, nextNode: ((node.nextNode.find((next)=> next===res.tartget))? node.nextNode : node.nextNode.concat(res.target)) }
                      : node
                  );
                }
              }
            });
          });
        }
      });
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [reactFlowInstance]);
  console.log("here", nodeData);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  // Drag and Drop Feature
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      let data;
      let nodeID = getId();

      if (type === "resNode") {
        data = {
          label: `Bot Response`,
          setNodeData: setNodeData,
          nodeID: nodeID,
        };
      }
      if (type === "fbNode") {
        data = { label: "Default Fallback", nodeID: nodeID };
      }
      if (type === "staticNode") {
        data = { label: "Start", nodeID: nodeID };
      }
      if (type === "quesNode") {
        data = { label: "Question Node", nodeID: nodeID };
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: nodeID,
        type,
        position,
        data: data,
      };

      setNodes((nodes) => nodes.concat(newNode));
    },
    [setNodes, reactFlowInstance]
  );

  //For the deletion
  const onClickElement = useCallback(
    (event, element) => {
      // Set the clicked element in local state

      return setClickedElement([...clickedElement, element]);
    },
    [setClickedElement]
  );

  const onClickElementDelete = useCallback(() => {
    const edgesToRemove = getConnectedEdges(clickedElement, edges);
    // console.log(clickedElement);
    // console.log(edgesToRemove)
    let update = nodes.filter((nds) => {
      return nds.id !== clickedElement[0].id;
    });

    // setEdges((edges) => edges.pop(edgesToRemove) );
    applyNodeChanges(update, nodes);
  }, [clickedElement, setNodes, setEdges, applyNodeChanges]);

  return (
    <div className="container chatflow" ref={reactFlowWrapper}>
      <h3>{title}</h3>
      <Card body>
        <div className="filled btn btn-outline-light mx-1" onClick={onShow}>
          {show == false ? <FaPlus /> : <VscChromeClose />}
        </div>
        <div className="  btn btn-outline-dark mx-1" onClick={onSave}>
          <b>
            Save &nbsp;
            <BsSave />
          </b>
        </div>
        <div className="btn btn-outline-danger mx-1" onClick={onRestore}>
          <b>
            Restore <BsArrowClockwise />
          </b>
        </div>

        {/* <div className="btn btn-outline-danger mx-1/2">Test your bot</div> */}
        <div className="btn btn-danger mx-2 ">
          <RiSendPlane2Fill /> Publish
        </div>
      </Card>

      <EditModal onShow={show} onClose={onClose}></EditModal>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onClickElement}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
      >
        <Controls showInteractive={true}>
          <ControlButton>
            <VscChromeClose onClick={onClickElementDelete} />
          </ControlButton>
        </Controls>
        <MiniMap
          style={{ position: "absolute", left: "4vw", border: "0px" }}
          nodeColor={nodeColor}
          nodeStrokeWidth={2}
        ></MiniMap>
      </ReactFlow>

      <Background color="#white" gap={16} />
    </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <Chatflow />
  </ReactFlowProvider>
);
