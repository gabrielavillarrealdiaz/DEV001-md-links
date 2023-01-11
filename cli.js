const {  
    filesOrDirectory, 
    pathYes,
    pathCheck,
    markdowFile,
    readFile,
    linksArray,
    readFileValidos,
    linksValidos,
} = require ('./index.js');
/*
mdLinks('/noexiste/')
.then(() => {})
.catch((error) => {
    console.log(error)
})*/



console.log('La ruta es un: ' + filesOrDirectory('C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt'))
console.log('La ruta es un: ' + filesOrDirectory('./doc'))
console.log('La ruta existe ' + pathYes('C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt'))  
console.log(pathCheck('C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt'))
console.log(pathCheck('./doc/probando.md'))
console.log(markdowFile('C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt')) 
console.log(markdowFile('./doc/probando.md'))

console.log(readFileValidos('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md'))

console.log(readFile('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md'))

/*readFile('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md').then((response)=> {
return response
}) .catch((error) => {
    console.log(error + 'error en la lectura de archivo')
})*/