let verificar = document.getElementById("verificar");

verificar.onclick = ()=>{ 
    let texto = document.getElementById("btnText-verificar").value;
    let regExp = new RegExp("[ab]+","g");
    regExp = regExp.exec(texto);
    try {
        if(texto == regExp[0]){
            let resultado = verificarPalabra(myDiagram, texto, 0, 0);
            if(resultado != false && (resultado.data.id == 2 || resultado.data.id == 3)){
                console.log(resultado);
            }else{
                descolorear(myDiagram);
            }
        }else{
            console.log("Hay simbolos que no pertenecen al lenguaje");
        } 
    } catch (e) {
        if(e instanceof TypeError){
            console.log("Hay simbolos que no pertenecen al lenguaje");
        }
    }
};

function verificarPalabra(diagrama, texto, indice, numNodo) {
    let nodo = diagrama.findNodeForKey(numNodo);
    pintar(nodo);
    if(indice < texto.length){
        let aristas = nodo.findTreeChildrenLinks();
        for(let i = 0; i < aristas.ia; i++){
            let results = aristas.ub._dataArray.filter(function (arista) { return arista.data.text == texto.charAt(indice) && arista.fromNode == nodo;});   
            let firstObj = (results.length > 0) ? true : false;
            if(!firstObj){
                return firstObj;
            }else if(aristas.ub._dataArray[i].data.text == texto.charAt(indice)){
                despintar(aristas.ub._dataArray[i].fromNode);
                pintar(aristas.ub._dataArray[i].toNode);
                return verificarPalabra(diagrama, texto, indice + 1, aristas.ub._dataArray[i].toNode.data.id);
            }
        }
    }else{ return nodo; }
}

function pintar(nodo) {
    window.setTimeout(function(){
        var shape = nodo.findObject("SHAPE"); //Obtener la forma de un nodo
        shape.fill = "red"; //Cambiar el color a un nodo   
    }, 1000);
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

function descolorear(diagrama){
    despintar(diagrama.findNodeForKey(2));
    despintar(diagrama.findNodeForKey(3));
}