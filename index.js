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
  return (path.isAbsolute(route)) ? route : path.resolve(route).replace(/\\/g, '/')
};


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

// es file
const isFile = (route) => fs.statSync(route).isFile();
// es directorio 
const isDirectory = (route) => fs.statSync(route).isDirectory();

//
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

const filterMd = (route) => {
 
  return saveFiles(route).filter((file => path.extname(file) === '.md'))

}

const ruta = 'C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md';

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
const validateLinks = (data) => {
  return Promise.all(data.map((link) => {
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

// leer archivos y llamar a la funcion getLinks retorna objeto con propiedades href, text, file


const readFile = (route) => fsp.readFile(route, 'utf8',);

readFile(ruta).then((data) => {
 console.log(getLinks(data))
})
  .catch((error) => {
    console.log(error + 'error: archivo no encontrado')
  })
//
// leer archivos y llama a funcion linksValidos retorna objeto con propiedades href, text, file, status, ok
const readFileValidos = (route) => fsp.readFile(route, 'utf8',);

readFileValidos(ruta).then((data) => {
  const links = getLinks(data);
  validateLinks(links).then(res => console.log(res));
});

// función mdLinks
const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    options = {
      validate: true,
    }

    if (pathYes(route)) {
      const routeAbsolute = pathCheck(route)
      const arrayRoute = filterMd(routeAbsolute);
      if (arrayRoute.length) {
        arrayRoute.forEach((file) => {
         resolve(readFile(file))
        })
      }
    }  else {

  reject('error: La ruta no existe')
}

  })
}

mdLinks('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md')


module.exports = {
  mdLinks,
  filesOrDirectory,
  pathYes,
  pathCheck,
  markdowFile,
};


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
