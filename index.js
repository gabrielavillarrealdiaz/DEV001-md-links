const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const fetch = require('node-fetch');
const { resolve } = require('path');
//const { resolve } = require('path');

// analizar si el path existe 
const pathYes = (route) => fs.existsSync(route)

// analiza si es un directorio o archivo 
const filesOrDirectory = (route) => {
  if (fs.statSync(route).isFile()) {
    return 'archivo';
  } else if (fs.statSync(route).isDirectory()) {
    return 'directorio';
  } else {
    return 'path inválido'
  }
}

// analiza si es ruta abosoluta o relativa (convierte relativa en absoluta )
function pathCheck(route) {
  return (path.isAbsolute(route)) ? route : path.resolve(route)
}

// analiza extensión y comprueba si el archivo es markdow
const markdowFile = (route) => {// (path.extname(route) === '.md') ? console.log('El archivo es .md') :  console.log('El formato del archivo no es .md');
  if (path.extname(route) === '.md') {
    console.log('El archivo es .md')
    return true
  } else {
    console.log('El formato del archivo no es .md')
    return false
  }
};

// muestra ruta del archivo analizado
const pathInput = (route) => process.argv[route];


// buscar links y retorna array de links con propiedades href, text, file (data es el contenido del archivo)
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
  })

// contar links unicos
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
// links broken
const linksBroken = (links) => {
  let broken = [];
  links.forEach(link => {
    if (link.ok === false) {
      broken.push(link.href)
    }
  });
  return broken.length;
}

// leer directorio
const directoryRead = (directory) => fs.readdirSync(directory);

// función mdLinks
const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => { //resolve y reject son funciones callback
    // identifica si existe ruta

    if (pathYes(path)) {
      resolve('')
      // analiza si es archivo o directorio
      // analiza si es archivo md
      // busca links y devuelve objeto
      // option es validate: va

    }
    else {

      reject('error: La ruta no existe')
    }

  })
}


module.exports = {
  mdLinks,
  filesOrDirectory,
  pathYes,
  pathCheck,
  markdowFile,
  linksArray,
  readFile,
  //readFileValidos,
  //linksValidos,

};