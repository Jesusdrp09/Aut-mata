window.onclick = ()=>{
    var node = myDiagram.findNodeForKey(1); //Encontrar un nodo por id
    myDiagram.select(node);
    console.log(node.data.id); //id de un nodo
    console.log(myDiagram);
    console.log(myDiagram.links.ia); //cantidad de aristas
    window.setInterval(function(){
        var shape = node.findObject("SHAPE"); //Obtener la forma de un nodo
        shape.fill = "red"; //Cambiar el color a un nodo
    }, 1000)
    console.log(node.data.color);   
    console.log(node.data.loc);   
    console.log(node.data.text);   
    let aristas = myDiagram.model.isGroupForNodeData(node);
    console.log(aristas);
}