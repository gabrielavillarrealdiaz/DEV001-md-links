const fs = require('fs');
const path = require('path')

// función que permite leer el contenido del archivo
function readFile(inputPath){
       fs.readFile(inputPath, 'utf-8', (err, contenido) => {
    if (err){console.log('error en la ruta')
        throw err;
        
    }
    console.log(contenido);
}) }

readFile('C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt')
readFile('./doc/probando.md')

// función que permite obtener el nombre del archivo 
function filename(inputPath){
   console.log(path.basename(inputPath))
}
filename('C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt')
filename('./doc/probando.md')

// función que permite obtener la extensión del archivo 
function ext(inputPath){
    console.log(path.extname(inputPath))
};

ext('./doc/probando.md');
ext('C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt');
ext('/prueba4.html');

// funcion para saber si el archivo es md (aun no se que hacer cuando si es md)true-false
function fileMd(inputPath, file){
   file = [];
    if (path.extname(inputPath) === '.md'){
        console.log(file.push(inputPath), 'si es archivo md')
        return true
        
    } else {
        console.log('no es archivo md')
        return false 
    }
    
    return file
}
fileMd('C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt')
fileMd('./doc/probando.md')
fileMd('./doc/otro.md')




/* const { saludarHolaMundo, saludar } = require("./prueba");
console.log(saludarHolaMundo());
console.log(saludar("gabi")) */