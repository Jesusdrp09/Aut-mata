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
            verificarPalabra(texto, 0, 0, tiempo);
        }else{
            mostrarError();
        } 
    } catch (e) {
        if(e instanceof TypeError){ mostrarError(); }
    }
}

function verificarPalabra(texto, indice, numNodo, tiempo) {
    let nodo = myDiagram.findNodeForKey(numNodo);
    despintarNodo(nodo);
    window.setTimeout(function(){
        pintarNodo(nodo);
        window.setTimeout(function(){
            if(indice < texto.length){
                let aristas = nodo.findTreeChildrenLinks();
                let results = aristas.ub._dataArray.filter(function (arista) { return arista.data.text == texto.charAt(indice) && arista.fromNode == nodo;});   
                if(results.length == 0){
                    descolorear(myDiagram, true);
                    return esAceptado(nodo, false);
                } else if(results[0].data.text == texto.charAt(indice)){
                    pintarRecorrido(results[0]);
                    return verificarPalabra(texto, indice + 1, results[0].toNode.data.id, tiempo);
                }
            }else{ return esAceptado(nodo); }
        }, tiempo);
    }, tiempo/2)
}

function pintarRecorrido(arista){
    despintarNodo(arista.fromNode);
    pintarNodo(arista.toNode);
    pintarArista(arista, tiempo);
}

function pintarArista(arista, tiempo) {
    window.setTimeout(function(){ 
        arista.path.stroke = "#52ce60";
    },tiempo/2);
    window.setTimeout(function(){ 
        arista.path.stroke = "black";
    }, tiempo);
}

function pintarNodo(nodo) {
    var shape = nodo.findObject("SHAPE"); //Obtener la forma de un nodo
    shape.fill = "red"; //Cambiar el color a un nodo   
}

function despintarNodo(nodo) {
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
        despintarNodo(diagrama.findNodeForKey(0));
        despintarNodo(diagrama.findNodeForKey(1));
        despintarNodo(diagrama.findNodeForKey(2));
        despintarNodo(diagrama.findNodeForKey(3));
    }else{
        despintarNodo(diagrama.findNodeForKey(2));
        despintarNodo(diagrama.findNodeForKey(3));
    }
}

function esAceptado(nodo, vertice = true){
    if((nodo.data.id == 3 || nodo.data.id == 2) && vertice){
        document.getElementById("resultado").innerHTML = "Estado de aceptación";
        document.getElementById("resultado").setAttribute("style","color: rgb(2, 172, 11);");
        return 1;
    }else{
        document.getElementById("resultado").innerHTML = "Estado de NO aceptación";
        document.getElementById("resultado").setAttribute("style", "color: rgb(173, 0, 0);");
        return 0;
    }
}

function mostrarError() {
    document.getElementById("resultado").innerHTML = "Hay simbolos que no pertenecen al lenguaje";
    document.getElementById("resultado").setAttribute("style", "color: rgb(173, 0, 0);");
}