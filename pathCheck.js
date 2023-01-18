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

//
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

// funcion para saber si el archivo es md (true-false)
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


/* analiza si es un directorio o archivo 
const filesOrDirectory = (route) => {
  if (fs.statSync(route).isFile()) {
    return 'archivo';
  } else if (fs.statSync(route).isDirectory()) {
    return 'directorio';
  } else {
    return 'path inválido'
  }
} */

/* analiza extensión y comprueba si el archivo es markdow
const markdowFile = (route) => {// (path.extname(route) === '.md') ? console.log('El archivo es .md') :  console.log('El formato del archivo no es .md');
  if (path.extname(route) === '.md') {
    console.log('El archivo es .md')
    return true
  } else {
    console.log('El formato del archivo no es .md')
    return false
  }
}; */

/*// buscar links y retorna array de links con propiedades href, text, file (data es el contenido del archivo)
const linksArray = (data) => {
  console.log({ data })
  const links = [];
  const linkFinder = /(\[(.*?)\])(\((.*?)\))/gim
  //const linkFinder = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;
  let match = linkFinder.exec(data);
  console.log("hola", match)
  while (match !== null) {
    links.push({
      href: match[4],
      text: match[2],
      file: pathInput(1)
      
    });
    match = linkFinder.exec(data);
  }
  return links;

}
// leer archivos y buscar links, devolver objeto con links y propiedades href, text, file
const readFile = (route) => fsp.readFile(route, 'utf8')
  .then((data) => {
    console.log(linksArray(data))
  })
  .catch((error) => {
    console.log(error + 'error: archivo no encontrado')
  })*/

  const linksUnicos = (links) => {
    let unicos = [];
    links.forEach(link => {
      if (!unicos.includes(link.href)) {
        unicos.push
      }
    });
    console.log('El total de links unicos es' + unicos.length)
    return unicos.length;
  
  }
  // contar links broken
  const linksBroken = (links) => {
    let broken = [];
    links.forEach(link => {
      if (link.ok === false) {
        broken.push(link.href)
      }
    });
    console.log('El total de links unicos es' + unicos.length)
    return broken.length;
  }
  