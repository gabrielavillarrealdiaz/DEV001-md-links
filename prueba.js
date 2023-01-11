/* const names = 'Gavi'
console.log(names);

const saludo = 'Hola'
console.log(saludo); */
const fs = require('fs');

function saludar(name){
    return `Hola ${name}, como estas`;
}

function saludarHolaMundo() {
    return 'hola mundo';
}
/* 
    module.exports.saludar = saludar;
    module.exports.saludarHolaMundo = saludarHolaMundo;
 */
   

fs.readFile('./doc/prueba3.txt', 'utf-8', (err, contenido) => {
    if (err){
        throw err;
    }
    console.log(contenido);
}) 

fs.readFile('./doc/probando.md', 'utf-8', (err, contenido) => {
    if (err){console.log('error en la ruta')
        throw err;
        
    }
    console.log(contenido);
}) 

function readFile(inputPAth){
    //inputPath = "C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt"
    fs.readFile(inputPAth, 'utf-8', (err, contenido) => {
    if (err){console.log('error en la ruta')
        throw err;
        
    }
    console.log(contenido);
}) }

console.log(readFile("C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt"))
/* fs.readFile("C:\Users\Gabriela\Desktop\docPrueba.txt", 'utf-8', (err, contenido) => {
    if (err){
        throw err;
    }
    console.log(contenido);
})
 */
module.exports = {
    saludar: saludar,
    saludarHolaMundo: saludarHolaMundo
};