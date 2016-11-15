var bd;

function iniciar() {

agregar_boton= document.getElementById("agregar");
agregar_boton.addEventListener("click", agregarobjeto, false);
nombre= document.getElementById("nombre").value;
fecha= document.getElementById("fecha").value;
email= document.getElementById("email").value;
numero= document.getElementById("numero").value;
comentario= document.getElementById("comentario").value;

var request = indexedDB.open("clientes2");

request.onupgradeneeded = function() {
  // The database did not previously exist, so create object stores and indexes.
  var db = request.result;
  var store = db.createObjectStore("corredora", {keyPath: "nombre"});
  var fechaIndex = store.createIndex("by_fecha", "fecha");
  var nombreIndex = store.createIndex("by_nombre", "nombre");
  var unico_todos= store.createIndex("by_todos", "hidden")

  // Populate with initial data.

};

request.onsuccess = function() {
  db = request.result;

};


}


function agregarobjeto(){
nombre= document.getElementById("nombre").value;
fecha= document.getElementById("fecha").value;
email= document.getElementById("email").value;
numero= document.getElementById("numero").value;
comentario= document.getElementById("comentario").value;

alert(email);
var tx = db.transaction("corredora", "readwrite");
var store = tx.objectStore("corredora");

store.put({nombre: nombre, fecha: fecha, email: email, numero:numero, comentario:comentario}, hidden:"todos");


tx.oncomplete = function() {
  // All requests have succeeded and the transaction has committed.
};
}



function mostrartodosdatos_pornombre(){

var zonadatos= document.getElementById("zonadatos")

var tx = db.transaction("corredora", "readonly");
var store = tx.objectStore("corredora");
var index = store.index("by_nombre");

var request = index.openCursor(IDBKeyRange.only("Fred"));
request.onsuccess = function() {
  var cursor = request.result;
  if (cursor) {
    // Called for each matching record.
    alert(cursor.value.nombre, cursor.value.fecha, cursor.value.email);
    zonadatos.innerHTML+="<div>"+cursor.value.nombre+ "-"+cursor.value.fecha+"</div>"
    cursor.continue();
  } else {
    // No more matching records.
    alert(null);
    
  }
};
}

function mostrartodosdatos_porfecha(){

var zonadatos= document.getElementById("zonadatos")

var tx = db.transaction("corredora", "readonly");
var store = tx.objectStore("corredora");
var index = store.index("by_nombre");

var request = index.openCursor(IDBKeyRange.only("Fred"));
request.onsuccess = function() {
  var cursor = request.result;
  if (cursor) {
    // Called for each matching record.
    alert(cursor.value.isbn, cursor.value.title, cursor.value.author);
    zonadatos.innerHTML+="<div>"+cursor.value.isbn+ "-"+cursor.value.author+"</div>"
    cursor.continue();
  } else {
    // No more matching records.
    alert(null);
    
  }
};
}

function mostrartodosdatos_porTODOS(){

var zonadatos= document.getElementById("zonadatos")

var tx = db.transaction("corredora", "readonly");
var store = tx.objectStore("corredora");
var index = store.index("by_todos");

var request = index.openCursor(IDBKeyRange.only("todos"));
request.onsuccess = function() {
  var cursor = request.result;
  if (cursor) {
    // Called for each matching record.
    alert(cursor.value.isbn, cursor.value.title, cursor.value.author);
    zonadatos.innerHTML+="<div>"+cursor.value.isbn+ "-"+cursor.value.author+"</div>"
    cursor.continue();
  } else {
    // No more matching records.
    alert(null);
    
  }
};
}




window.addEventListener("load", iniciar, false);