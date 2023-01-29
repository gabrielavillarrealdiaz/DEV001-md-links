const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const fetch = require('node-fetch');
const { resolve } = require('path');

// analizar si el path existe 
//const pathYes = (route) => fs.existsSync(route) usar la funcion de node, no es necesario renombrar 

// analiza si es ruta abosoluta o relativa (convierte relativa en absoluta )
function pathCheck(route) {
  return (path.isAbsolute(route)) ? route : path.resolve(route)
};
// .replace(/\\/g, '/') 
//C:\Users\Gabriela\Desktop\proyecto4\DEV001-md-links\doc\probando.md


// es file
const isFile = (route) => fs.statSync(route).isFile();

// es directorio 
//const isDirectory = (route) => fs.statSync(route).isDirectory();

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
// filtra archivos md, retorna array de files md 
const filterMd = (route) => {

  if (path.extname(route) === '.md') {

    console.log('arrmd', route)
    return route

  }
  else {
    console.log('error : no es archivo md')
    return new Error('error : no es archivo md');
  }

  //if (route.slice(-2) !== 'md') { // que los ultimos dígitos sean md

  // console.log('error: no es archivo md', file)
  //}
  //return saveFiles(route).filter((file => path.extname(file) === '.md'))

}


const ruta = 'C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md';
const rutaDirectory = 'C:\Users\Gabriela\Desktop\proyecto4\DEV001-md-links\doc';
const rutaArchivoTxt = 'doc\prueba3.txt'
const archivoSinLinks = 'C:\Users\Gabriela\Desktop\proyecto4\DEV001-md-links\doc\otro.md'



// const busca links y devuelve array de links con propiedades href, text, file (usuario ingresa mdlinks y ruta)
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
  // console.log("validos",  validos)
  return validos
};

// const que valida links, retorna array de links con propiedades href, text, files, estatus, ok mdlink ruta y --validate
const validateLinks = (data) => {
    // data es el contenido de los archivos
  console.log("¨validos-data en validate linkssssssssssss", data)
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
};

//console.log('hhhhhhhhhhh', validateLinks(ruta).then(()))

// const que lee archivos y llamar a la funcion getLinks retorna objeto con propiedades href, text, file
const readFile = (route) => fs.readFileSync(route,  {encoding:'utf8', flag:'r'});


/*readFile(ruta).then((data) => {

  //console.log('getlinksss', getLinks(data))


  return getLinks(data)
})
  .catch((error) => {
    console.log(error + 'error: archivo sin linkssss')
  }) */

// const que lee archivos y llama a funcion validateLinks retorna objeto con propiedades href, text, file, status, ok
//const readFileValidos = (route) => fsp.readFileSync(route, 'utf8',);
/*
readFileValidos(ruta).then((data) => {
  // console.log("la data del then ", data)
  const links = getLinks(data);
  validateLinks(links).then((res) => {
   //console.log('resssssssss', res)
    return res
    //resolve(res)
    //return Promise.all(res)

  })
})
  .catch((error) => {
    console.log(error + 'error: archivo sin links!!!')
  })*/



// función mdLinks, dos parámetros (ruta y opcion (--validate, ---status, --validate --status ), retorna una promesa
const mdLinks = (route, options) => {
  options = { validate: false };
  return new Promise((resolve, reject) => {
    //const routeAbsolute = pathCheck(route)
    if (fs.existsSync(route)) {
      console.log('la ruta existe')
      //console.log('comprobando ruta', route)//comprueba que la ruta existe, si no existe mensaje error la ruta no existe. si existe entra en el if...
      //console.log('aqui', routeAbsolute)// analiza si es ruta absoluta o relativa, convierte a absoluta
      //const absRoute = filterMd(routeAbsolute);
      //console.log('aqui', absRoute)

      if (options.validate === true) { // si option es validate
          const linksget = getLinks(readFile(route));                               //funcion validateLinks(salicitud de validacion http), promesa q devuele objeto con links y propiedades href, text, file status ok
          validateLinks(linksget).then((links) => {
            
          console.log('responseresponse', links)
          resolve(links) // resolve objeto
           })
        
      } else if (options.validate === false) {
       
          resolve(getLinks(readFile(route)))
          console.log('aqui no entro')
          //resolve(getLinks(response))
          //return getLinks(response)

          //resolve(response)
          //console.log('response if else', response)
        // si validate false retorna objeto de readFile, obtiene links con propiedades href, text, file




        //console.log('esta es la ruta absoluta',routeAbsolute)// retorna array archivos(files) md (toma como parámetro las rutas absolutas)// filter md espera una extensión
        /* if (absRoute.length) {
           console.log(arrayRoute)
           // console.log('buscando el array', arrayRoute) // si hay archivos ok
           // console.log('entro aqui?', route) //recorre archivos
           arrayRoute.forEach((route) => { 
                  if (options.validate === true) { // si option es validate
             readFileValidos(route).then((response) => { //funcion validateLinks(salicitud de validacion http), promesa q devuele objeto con links y propiedades href, text, file status ok
               validateLinks(response).then((links) => {
                 resolve(links) // resolve objeto
               })
             })
           } else if (options.validate === false) {
             readFile(route).then((response) => {
               //resolve(getLinks(response))
               resolve(response)
             }) // si validate false retorna objeto de readFile, obtiene links con propiedades href, text, file
             return; 
   
           }})*/







        //} else if (arrayRoute.length === 0) { // si no hay archivos 
        //reject('error: No hay archivos md')
      }//
    } else {

      reject(new Error('error: La ruta no existe'))
    }

  })
}


/*mdLinks('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md')
.then(() => {})
.catch((error) => {
    console.log(error)
})
//('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md')*/





// contar links unicos (--stats)
const statsFun = (links) => {
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
