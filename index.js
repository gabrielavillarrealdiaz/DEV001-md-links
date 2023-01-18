const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const fetch = require('node-fetch');
const { resolve } = require('path');

// analizar si el path existe 
const pathYes = (route) => {
fs.existsSync(route)
}

// analiza si es ruta abosoluta o relativa (convierte relativa en absoluta )
function pathCheck(route) {
return (path.isAbsolute(route)) ? route : path.resolve(route) 
};
// .replace(/\\/g, '/') 


// es file
const isFile = (route) => fs.statSync(route).isFile();

// es directorio 
//const isDirectory = (route) => fs.statSync(route).isDirectory();

// retorna array con archivos (si es file push a array files, else, si es directorio, recorre files del direcctorio y devuelve arrays con files)
saveFiles = (route) => {
  let arrayFiles = [];
  if (isFile(route)) {
    arrayFiles.push(route)
  } else {
    const readDirectory = (route) => fs.readdirSync(route);
    readDirectory.forEach((file) => {
      const director = path.join(route, file);
      arrayFiles = [...arrayFiles, ...arrayFiles(saveFiles(director))]
    })
  }
  return arrayFiles;
}
// filtra archivos md, retorna array de files md 
const filterMd = (route) => {
  if(route !== 'md'){
    console.log( 'error: no es archivo md')
  }
  return saveFiles(route).filter((file => path.extname(file) === '.md'))
}


const ruta = 'C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md';
const rutaDirectory = 'C:\Users\Gabriela\Desktop\proyecto4\DEV001-md-links\doc';
const rutaArchivoTxt = 'doc\prueba3.txt'
const archivoSinLinks = 'C:\Users\Gabriela\Desktop\proyecto4\DEV001-md-links\doc\otro.md'


// const busca links y devuelve array de links con propiedades href, text, file
const getLinks = (data) => {
  const validos = [];
  const linkFinder = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
  let match = linkFinder.exec(data);
  while (match !== null) {
    validos.push({
      href: match[2],
      text: match[1],
      file: ruta,
    })
    match = linkFinder.exec(data);
  }
  return validos
};
// const que valida links, retorna array de links con propiedades href, text, files, estatus, ok
const validateLinks = (data) => { // data es el contenido de los archivos
  return Promise.all(data.map((link) => { // promise.all array de promesas
    return fetch(link.href).then((response) => {
      return {
        href: link.href,
        text: link.text,
        file: ruta,
        status: response.status,
        ok: response.ok ? 'ok' : 'fail'
      }
    })
  }))
}

// const que lee archivos y llamar a la funcion getLinks retorna objeto con propiedades href, text, file
const readFile = (route) => fsp.readFile(route, 'utf8',);
readFile(ruta).then((data) => {
  console.log(getLinks(data))
})
  .catch((error) => {
    console.log(error + 'error: archivo sin links')
     })

// const que lee archivos y llama a funcion validateLinks retorna objeto con propiedades href, text, file, status, ok
const readFileValidos = (route) => fsp.readFile(route, 'utf8',);

readFileValidos(ruta).then((data) => {
  const links = getLinks(data);
  validateLinks(links).then(res => console.log(res));
});

// función mdLinks, dos parámetros (ruta y opcion (--validate, ---status, --validate --status ), retorna una promesa
const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    if (pathYes(route)) { //comprueba que la ruta existe, si no existe mensaje error la ruta no existe. si existe entra en el if...
      const routeAbsolute = pathCheck(route) // analiza si es ruta absoluta o relativa, convierte a absoluta
      const arrayRoute = filterMd(routeAbsolute); // retorna array archivos md (toma como parámetro las rutas absolutas)
      if (arrayRoute.length) { // si hay archivos
        arrayRoute.forEach((file) => { //recorre archivos
          readFile(file).then((response) => { //leer links del file, devuelve promesa
            if (options.validate === true) { // si option es validate
              readFileValidos(response).then((links) => { //funcion validateLinks, promesa q devuele objeto con links y propiedades
                resolve(links) // resolve objeto
              })
            } else if (options.validate === false) { // si validate false retorna objeto de readFile, obtiene links con propiedades href, text, file
              resolve(response)
            }
          })

        })
      } else { // si no hay archivos 
        reject('error: No hay archivos md')
      }
    } else {

      reject(new Error('error: La ruta no existe'))
    }

  })
}


mdLinks('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md')
.then(() => {})
.catch((error) => {
    console.log(error)
})
//('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md')





// contar links unicos (--stats)
const statsFun = (links) =>{
  const unicos = new Set(links.map((link) => links.href)).size;
  return {
    Total: links.length,
    Unicos: unicos,
    }
};

// contar links rotos (--stats --validate)
const statsValidate = (links) => {
  const unicos = new Set(arrOfLinks.map((link) => link.href)).size;
  const broken = links.filter((link) => link.ok === 'fail')
  return {
    Total: links.length,
    Unicos: unicos,
    Broken: broken.length
  }
}


module.exports = {
  statsFun,
  statsValidate,
  mdLinks,
  pathCheck,
};
