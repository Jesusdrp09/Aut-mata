let verificar = document.getElementById("verificar");

verificar.onclick = ()=>{ 
    let texto = document.getElementById("btnText-verificar").value;
    let regExp = new RegExp("[ab]+","g");
    regExp = regExp.exec(texto);
    document.getElementById("resultado").innerHTML = "";
    descolorear(myDiagram, true);
    try {
        if(texto == regExp[0]){
            tiempo = document.getElementById("velocidad").value;
            verificarPalabra(myDiagram, texto, 0, 0, tiempo);
        }else{
            console.log("Hay simbolos que no pertenecen al lenguaje");
        } 
    } catch (e) {
        if(e instanceof TypeError){
            console.log("Error null");
        }
    }
};

function verificarPalabra(diagrama, texto, indice, numNodo, tiempo) {
    let nodo = diagrama.findNodeForKey(numNodo);
    window.setTimeout(function(){
        pintar(nodo);
        window.setTimeout(function(){
            if(indice < texto.length){
                    let aristas = nodo.findTreeChildrenLinks();
                    for(let i = 0; i < aristas.ia; i++){
                        let results = aristas.ub._dataArray.filter(function (arista) { return arista.data.text == texto.charAt(indice) && arista.fromNode == nodo;});   
                        let firstObj = (results.length > 0) ? true : false;
                        if(!firstObj){
                            descolorear(diagrama, true);
                            return esAceptado(nodo, false);
                        }else if(aristas.ub._dataArray[i].data.text == texto.charAt(indice)){
                            despintar(aristas.ub._dataArray[i].fromNode);
                            pintar(aristas.ub._dataArray[i].toNode);
                            return verificarPalabra(diagrama, texto, indice + 1, aristas.ub._dataArray[i].toNode.data.id, tiempo);
                        }
                    }
            }else{ return esAceptado(nodo); }
        }, tiempo);
    }, tiempo/2)
}

function pintar(nodo) {
    var shape = nodo.findObject("SHAPE"); //Obtener la forma de un nodo
    shape.fill = "red"; //Cambiar el color a un nodo   
}

function despintar(nodo) {
    if(nodo.data.category == "aceptar"){
        var shape = nodo.findObject("SHAPE"); //Obtener la forma de un nodo
        shape.fill = "#37FF1F"; //Cambiar el color a un nodo
    }else{
        var shape = nodo.findObject("SHAPE"); //Obtener la forma de un nodo
        shape.fill = "white"; //Cambiar el color a un nodo
    }  
}

function descolorear(diagrama, limpiarTodo = false){
    if(limpiarTodo){
        despintar(diagrama.findNodeForKey(0));
        despintar(diagrama.findNodeForKey(1));
        despintar(diagrama.findNodeForKey(2));
        despintar(diagrama.findNodeForKey(3));
    }else{
        despintar(diagrama.findNodeForKey(2));
        despintar(diagrama.findNodeForKey(3));
    }
}

function esAceptado(nodo, vertice = true){
    if((nodo.data.id == 3 || nodo.data.id == 2) && vertice){
        document.getElementById("resultado").innerHTML = "Estado de aceptación";
        document.getElementById("resultado").setAttribute("style","color: rgb(2, 172, 11);")
        return 1;
    }else{
        document.getElementById("resultado").innerHTML = "Estado de NO aceptación";
        document.getElementById("resultado").setAttribute("style", "color: rgb(173, 0, 0);")
        return 0;
    }
}