const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const fetch = require('node-fetch');

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
    return false } };



// buscar links y obtener array de links con propiedades href, text, file (data es el contenido del archivo)
const linksArray = (data) => {
  console.log({data})
  const links = [];
  const linkFinder = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm
  ;
  let match = linkFinder.exec(data);
  console.log({match})
  while (match !== null) {
    links.push({
      href: match[2], 
      text: match[5],
      file: './doc/probando.md',
    });
    match = linkFinder.exec(data);
  }
  return links;
}
//validar expresion regular (ver unicamente los links)
// retornar arrelgo de links
// iterar el arreglo y agregar al links con el formato o hacer un map

// validar links (devuelve objeto con href, text, file, status)

const linksValidos = (data) => {
  const validos = [];
  const linkFinder = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/gim;
  let match = linkFinder.exec(data);
  while (match !== null) {
    let matchLinks = match;
    validos.push(fetch(match[4]).then((response) => {
      return {
        href: matchLinks[4],
        text: matchLinks[2],
        file: '',
        status: response.status,
      }
    }))
  
    match = linkFinder.exec(data);
  }
  return Promise.all(validos)
}



// leer directorio
const directoryRead = (directory) => fs.readdirSync(directory);

// leer archivos y buscar links, devolver objeto con links y propiedades href, text, file
const readFile = (route) => fsp.readFile(route,'utf8')
  .then((data) => {
    console.log(linksArray(data))
  })
  .catch((error) => {
    console.log(error + 'error: archivo no encontrado')
  })

// leer archivos y retornar objeto con propiedades href, text, file, status, ok)
const readFileValidos = (route) =>fs.readFile(route, 'utf8', (error, data) =>{
  if(data){
    linksValidos(data)
    .then(console.log)
  } else if(error){
    console.log(error + 'error: archivo no encontrado')
  }
});

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
  readFileValidos,
  linksValidos,
  
};