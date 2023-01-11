const path = require('path')
//función que evalua las rutas, si es relativa la convierte a absoluta. si es absoluta se mantiene ruta(invertir if else)
function pathCheck(inputPath){
        const pathAbsolute = path.isAbsolute(inputPath);
    if (pathAbsolute === true){ 
        console.log('La ruta es absoluta, se mantiene el path:') 
        return inputPath
     }
   
    else {
    inputPath = path.resolve(inputPath)
    console.log('La ruta es relativa y se convirtió a absoluta:')
    return inputPath}
  
    
}

console.log(pathCheck('./doc/prueba3.txt'))
console.log(pathCheck('./doc/probando.md'))
console.log(pathCheck("C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/prueba3.txt"))
console.log(pathCheck("C:/Users/Gabriela/Desktop/proyecto4/docPrueba.txt"))

module.exports = {pathCheck}