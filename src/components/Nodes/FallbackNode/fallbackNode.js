import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import './fallbackNode.scss'

function FallbackNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="fbNode">
     <Handle type="target" position={Position.Left} id="b" />
     <Handle type="source" position={Position.Right} id="a" />
      <div>
        <button className=' btn btn-secondary'  id="text" type="button" onChange={onChange} >{data.label}</button>
      </div>
    
    </div>
  );
}

export default FallbackNode
