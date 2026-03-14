/*
Cosmic Religion Map
Script principal responsável por:

1 carregar dados JSON
2 montar os nós
3 montar conexões
4 criar grafo interativo
5 exibir informações ao clicar
*/

async function loadData() {

try {

const hinduData = await fetch("data/hinduism.json").then(res => res.json())

const relationData = await fetch("data/relations.json").then(res => res.json())

createGraph(hinduData.nodes, relationData.edges)

}
catch(error) {

console.error("Erro ao carregar dados:", error)

}

}

function createGraph(nodesData, edgesData){

const nodes = new vis.DataSet(

nodesData.map(node => ({

id: node.id,
label: node.name,
color: node.color

}))

)

const edges = new vis.DataSet(

edgesData.map(edge => ({

id: edge.id,
from: edge.from,
to: edge.to,
color: "#888"

}))

)

const container = document.getElementById("network")

const data = {
nodes: nodes,
edges: edges
}

const options = {

nodes:{
shape:"dot",
size:18,
font:{
color:"white"
}
},

edges:{
smooth:true
},

physics:{
barnesHut:{
gravitationalConstant:-2000
}
}

}

const network = new vis.Network(container, data, options)

/* Evento de clique */

network.on("click", function(params){

if(params.nodes.length){

showNodeInfo(nodesData, params.nodes[0])

}

if(params.edges.length){

showEdgeInfo(edgesData, params.edges[0])

}

})

}

/* Mostrar informações do nó */

function showNodeInfo(nodesData, nodeId){

const node = nodesData.find(n => n.id === nodeId)

const info = document.getElementById("info")

info.innerHTML = `
<h2>${node.name}</h2>
<p>${node.description}</p>
`

}

/* Mostrar informações da conexão */

function showEdgeInfo(edgesData, edgeId){

const edge = edgesData.find(e => e.id === edgeId)

const info = document.getElementById("info")

info.innerHTML = `
<h2>Relação</h2>
<p>${edge.description}</p>
`

}

loadData()
