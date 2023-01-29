const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const fetch = require('node-fetch');
const { resolve } = require('path');

// analiza si es ruta abosoluta o relativa (convierte relativa en absoluta )
function pathCheck(route) {
  return (path.isAbsolute(route)) ? route : path.resolve(route).replace(/\\/g, '/') 
};

// es file
//const isFile = (route) => fs.statSync(route).isFile();

/*
// retorna array con archivos (si es file push a arrayfiles, else, si es directorio, recorre files del direcctorio y devuelve arrays con files)
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
*/
// filtra archivos md, retorna array de files md 
const filterMd = (route) => {

  if (path.extname(route) === '.md') {
      return route
  }
  else {
    //console.log('error : no es archivo md')
    return new Error('error : no es archivo md');
  }
}
//const ruta = 'C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md';

// const busca links y devuelve array de links con propiedades href, text, file (usuario ingresa mdlinks y ruta)
const getLinks = (data, route) => {
  const validos = [];
  const linkFinder = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g;
  let match = linkFinder.exec(data);
  while (match !== null) {
    validos.push({
      href: match[2],
      text: match[1],
      file: route,
    })
    match = linkFinder.exec(data);
  }
  return validos
};

// const que valida links, retorna array de links con propiedades href, text, files, estatus, ok mdlink ruta y --validate
//funcion validateLinks(salicitud de validacion http), promesa q devuele objeto con links y propiedades href, text, file status ok
const validateLinks = (data, route) => {
  return Promise.all(data.map((link) => { // promise.all array de promesas
    return fetch(link.href).then((response) => {
      return {
        href: link.href,
        text: link.text,
        file: route,
        status: response.status,
        ok: response.ok ? 'ok' : 'fail'
      }
    })
  }))
};

// const que lee archivos sincronica
const readFile = (route) => fs.readFileSync(route,  {encoding:'utf8', flag:'r'});

// función mdLinks, dos parámetros (ruta y opcion (--validate, ---status, --validate --status ), retorna una promesa
const mdLinks = (route, options) => {
 // options = { validate: true };
  return new Promise((resolve, reject) => {
    const routeAbsolute = pathCheck(route)
    if (fs.existsSync(routeAbsolute)) {
      const mdFile = filterMd(routeAbsolute);
      //console.log(mdFile)
       if (options.validate === true) { 
          const linksget = getLinks(readFile(routeAbsolute));                               
          validateLinks(linksget, routeAbsolute).then((links) => { 
           resolve(links) 
           })
        
      } else if (options.validate === false) {// esto no se esta usando
       
          resolve(getLinks(readFile(routeAbsolute)))
          console.log('getlinks',getLinks(readFile(routeAbsolute)))
          console.log('rutaabsoluta', routeAbsolute)
             }
    } else {
      reject(new Error('error: La ruta no existe'))
    }

  })
}

// conntar links unicos en al archivo
const linksUnique = (data) => {
  const unicos = new Set(data.map((link) => link.href)).size;
  return unicos 
};

// contar links rotos
const linksBroken = (data) => {
  data.filter((link) => link.ok === 'fail')
  return linksBroken.length
  
};

const linksTotal = (data) => {
  return data.length;
}





module.exports = {
  linksUnique,
  linksBroken,
  linksTotal,
  mdLinks,
  pathCheck,
  validateLinks,
  getLinks,

};
