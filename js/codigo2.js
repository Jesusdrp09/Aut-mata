let verificar = document.getElementById("verificar");

verificar.onclick = ()=>{
        let texto = document.getElementById("btnText-verificar").value;
        let regExp = new RegExp("[ab]+","g");
        regExp = regExp.exec(texto);
        try {
          if(texto == regExp[0]){
            console.log(verificarPalabra(myDiagram, texto, 0, 0));
          }else{
            console.log("Hay simbolos que no pertenecen al lenguaje");
          } 
        } catch (e) {
          if(e instanceof TypeError){
            console.log("error null");
          }
        }
};

function verificarPalabra(diagrama, texto, indice, numNodo) {
    let bandera = false;
    let nodo = diagrama.findNodeForKey(numNodo);
    console.log(diagrama);
    console.log(texto);
    console.log(indice);
    console.log(numNodo);
    console.log(texto.length);
    pintar(nodo);
    if(indice < texto.length){
        let aristas = nodo.findTreeChildrenLinks();
        for(let i = 0; i < aristas.ia; i++){
            if(aristas.ub._dataArray[i].data.text == texto.charAt(indice) && nodo != aristas.ub._dataArray[i].toNode){
                despintar(aristas.ub._dataArray[i].fromNode);
                pintar(aristas.ub._dataArray[i].toNode);
                bandera = true;
                console.log(texto.charAt(indice));
                console.log(aristas.ub._dataArray[i].fromNode.data.id);
                console.log(aristas.ub._dataArray[i].toNode.data.id);
                console.log(diagrama);
                console.log(texto);
                console.log(texto.charAt(indice + 1));
                console.log(indice + 1);
                console.log(aristas.ub._dataArray[i].toNode.data.id);
                return verificarPalabra(diagrama, texto, indice + 1, aristas.ub._dataArray[i].toNode.data.id);
            }
        }
        if(!bandera){
            return false;
        }
    }else{
        return nodo;
    }
}

function pintar(nodo) {
    window.setTimeout(function(){
        var shape = nodo.findObject("SHAPE"); //Obtener la forma de un nodo
        shape.fill = "red"; //Cambiar el color a un nodo   
    }, 2000);
}

function despintar(nodo) {
    window.setTimeout(function(){
        if(nodo.data.category == "aceptar"){
            var shape = nodo.findObject("SHAPE"); //Obtener la forma de un nodo
            shape.fill = "#37FF1F"; //Cambiar el color a un nodo
        }else{
            var shape = nodo.findObject("SHAPE"); //Obtener la forma de un nodo
            shape.fill = "white"; //Cambiar el color a un nodo
        }  
    }, 1000)    
}

// window.onclick = ()=>{
//     var node = myDiagram.findNodeForKey(0); //Encontrar un nodo por id
//     myDiagram.select(node);
//     console.log(node.data.id); //id de un nodo
//     console.log(myDiagram);
//     console.log(myDiagram.links.ia); //cantidad de aristas
//     window.setInterval(function(){
//         var shape = node.findObject("SHAPE"); //Obtener la forma de un nodo
//         shape.fill = "red"; //Cambiar el color a un nodo
//     }, 1000)
//     console.log(node.data.color);   
//     console.log(node.data.loc);   
//     console.log(node.data.text);   
//     let aristas = node.findTreeChildrenLinks();
//     console.log(aristas.ub._dataArray[0].fromNode.data.id);
//     console.log(aristas.ub._dataArray[0].toNode.data.id);
//     console.log(aristas.ub._dataArray[0].data.text);
// }