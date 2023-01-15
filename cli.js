const {  
    pathCheck,
    //mdLinks
} = require ('./index.js');

mdLinks('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md')
.then(() => {})
.catch((error) => {
    console.log(error)
})



/*console.log('La ruta es un: ' + filesOrDirectory('C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt'))
console.log('La ruta es un: ' + filesOrDirectory('./doc'))
console.log('La ruta existe ' + pathYes('C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt'))  
console.log(pathCheck('C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt'))
console.log(pathCheck('./doc/probando.md'))
console.log(markdowFile('C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt')) 
console.log(markdowFile('./doc/probando.md'))*/

//



//console.log(readFile('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md'))

/*readFile('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md').then((response)=> {
return response
}) .catch((error) => {
    console.log(error + 'error en la lectura de archivo')
})*/

//mdLinks('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/uno.md')

//mdLinks('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/otro.md')

//mdLinks('doc/prueba3.txt')
//mdLinks('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/prueba3.txt')

//mdLinks('C:\Users\Gabriela\Desktop\proyecto4\DEV001-md-links\doc\probando.md')
//mdLinks('doc/probando.md')


//console.log('probando', pathCheck('doc\probando.md'))

// console.log('probando', pathCheck('docPrueba.txt'))