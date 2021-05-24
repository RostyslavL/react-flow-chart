import React,{useState, Fragment} from 'react'
import ReactFlow, {addEdge, Background, Controls, MiniMap} from 'react-flow-renderer'


const initialElements = [
    {
        id: '1',
        type: 'input',
        data:{
            label:  'Node'
        },
        position:{
            x:0,
            y:0
        },
        color: ''
    }
]

const MindNode = () =>{

    const [elements, setElements] = useState(initialElements)
    const [name, setName] = useState('')

    const onLoad = (reactFlowInstance) =>{
        reactFlowInstance.fitView()
    }

    const addNode = () =>{
        setElements((e) => e.concat({
            id: (e.length + 1).toString(),
            data: {label: `${name}`},
            position:{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
            },
        }))
    }
    const onConnect = (params) => setElements((e) => addEdge(params, e))

    return(
        <Fragment >
           <ReactFlow 
                elements={elements} 
                style={{width: '100%', height:'90vh', background: 'red'}}
                onLoad={onLoad}
                onConnect={onConnect}
                connectionLineType= 'bezier'
                connectionLineStyle={{stroke: '#333', strokeWidth:3}}
                snapToGrid={true}
                snapGrid={[16, 16]}
                >   <Background
                        style={{background: '#eee'}} 
                        color='#888'
                        gap={16}
                    />
                <MiniMap  nodeColor={(n) =>{
                    if(n.type === 'input') {
                        return 'blue'
                    }else{
                        return 'red'
                    }
                }}/>
                <Controls  />
            </ReactFlow>
            <div >
                <input 
                    type="text"  
                    name="title"
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Add Node"
                />
                <button type="button" onClick={addNode}>
                    Add Node
                </button>
            </div>
        </Fragment>
    )
}

export default MindNode