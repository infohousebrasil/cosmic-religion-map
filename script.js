async function loadData(){

const hindu = await fetch("data/hinduism.json").then(r=>r.json())

const relations = await fetch("data/relations.json").then(r=>r.json())

createGraph(hindu.nodes,relations.edges)

}

function createGraph(nodesData,edgesData){

const nodes = new vis.DataSet(

nodesData.map(n=>({

id:n.id,

label:n.name,

color:n.color

}))

)

const edges = new vis.DataSet(

edgesData.map(e=>({

id:e.id,

from:e.from,

to:e.to,

color:"#666"

}))

)

const container=document.getElementById("network")

const data={nodes,edges}

const options={

nodes:{
shape:"dot",
size:22,
font:{
color:"white",
size:16
}
},

edges:{
smooth:true
},

physics:{
barnesHut:{
gravitationalConstant:-3000
}
}

}

const network=new vis.Network(container,data,options)

/* clique */

network.on("click",function(params){

if(params.nodes.length){

showNode(nodesData,params.nodes[0])

}

if(params.edges.length){

showEdge(edgesData,params.edges[0])

}

})

}

function showNode(nodesData,id){

const node=nodesData.find(n=>n.id===id)

document.getElementById("cardContent").innerHTML=`

<h2>${node.name}</h2>

<p>${node.description}</p>

`

}

function showEdge(edgesData,id){

const edge=edgesData.find(e=>e.id===id)

document.getElementById("cardContent").innerHTML=`

<h2>Relação</h2>

<p>${edge.description}</p>

`

}

loadData()