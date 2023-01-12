const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const fetch = require('node-fetch');

// retorna ruta ingresada 
const pathInput = (route) => process.argv[route];
// validar links y devuelve objeto con propiedades opcion 1
const linksValidos = (data) => {
    const validos = [];
    const linkFinder = /(\[(.*?)\])(\((.*?)\))/gim
    let match = linkFinder.exec(data);
     while (match !== null) {
       validos.push({
           href: match[4],
           text: match[2],
           file: pathInput(1), //?              
           status: fetch(match[4])
               .then((response) => {
                   console.log(response.status);
                   return response.status
               }),
               ok: fetch(match[4])
               .then((response) => {
                   (response.ok) ? console.log('ok') : console.log('fail');
               })
               }) 
   
      match = linkFinder.exec(data);
    }
  
   return validos 
  };  
   // leer archivos y llama a funcion linksValidos opcion 1
   const readFileValidos = (route) => fsp.readFile(route, 'utf8')
   .then((data) => {
     console.log(linksValidos(data))
   })
   .catch((error) => {
     console.log(error + 'error: archivo no encontrado')
   })

   // validar links y devuelve objeto con propiedades opcion 2
    const linksValidos2 = (data) => {
    const validos = [];
    const linkFinder = /(\[(.*?)\])(\((.*?)\))/gim
    let match = linkFinder.exec(data);
     while (match !== null) {
        validos.push(fetch(match[4]).then((response) => {
        return {
          href: match[4],
          text: match[2],
          file: pathInput(1),
          status: response.status,
        }
      }))
      match = linkFinder.exec(data);
    }
  
   return Promise.all(validos);
   
  };

   // leer archivos y llama a funcion linksValidos opcion 2   
   const readFileValidos2 = (route) => fsp.readFile(route, 'utf8', (error, data) => {
    if(data){ 
      linksValidos(data).then(console.log);
      } else if (error) {
        console.error(error , 'error: no hay links validos' )
      }
    }); 

    //

   console.log(readFileValidos('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md'))



   //validar expresion regular (ver unicamente los links)
// retornar arrelgo de links
// iterar el arreglo y agregar al links con el formato o hacer un map

// validar links (devuelve objeto con href, text, file, status)

/*const linksValidos = (data) => {
  const validos = [];
  const linkFinder = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/gim;
  let match = linkFinder.exec(data);
  for (let i = 0; i < data.length; i++) {
    if (match !== null) {
        validos.push({
            href: match[4],
            text: match[2],
            file: 'pathUserInput(1)',
            status: fetch(match[4])
                .then((response) => {
                    console.log(response.status);
                }),
            ok: fetch(match[4])
                .then((response) => {
                    (response.ok) ? console.log('ok') : console.log('fail');
                })
        });
        match = linkFinder.exec(data);
    }
}
return validos;
}; */


/*const linksValidos = (data) => {
  const validos = [];
  const linkFinder = /\[(.+?)\]\((https?:\/\/[^\s)]+)\)/gim;
  let match = linkFinder.exec(data);
 while(match !== null) {
        validos.push({
            href: match[2],
            text: match[1],
            file: pathInput(1) ,
          
            status: fetch(match[2])
                .then((response) => {
                    console.log(response.status);
                }),
                ok: fetch(match[4])
                .then((response) => {
                    (response.ok) ? console.log('ok') : console.log('fail');
                })
        });
        match = linkFinder.exec(data);
      }  return validos;
    };*/

/*const linksValidos = (data) => {
  const validos = [];
  const linkFinder = /(\[(.*?)\])(\((.*?)\))/gim
  let match = linkFinder.exec(data);
   while (match !== null) {
     validos.push({
         href: match[4],
         text: match[2],
         file: pathInput(1), //?              
         status: fetch(match[4])
             .then((response) => {
                 console.log(response.status);
                 return response.status
             }),
             ok: fetch(match[4])
             .then((response) => {
                 (response.ok) ? console.log('ok') : console.log('fail');
             })
             }) 
             
    /*validos.push(fetch(match[4]).then((response) => {
      return {
        href: match[4],
        text: match[2],
        file: pathInput(1),
        status: response.status,
      }
    }))
    match = linkFinder.exec(data);
  }

 //return Promise.all(validos);
 return validos 
}; */

//const linksValidos = (route) => new Promise ((resolve, reject))


/*const linksValidos = (links) => {
  console.log('links ', links)
  const validos = links.map((link) => {
    console.log(link)
    return fetch(match.href).then((response) => {

      return {
        href: link.href,
        text: link.text,
        file: link.file,
        status: response.status,
        Ok: response.status < 400 ? 'ok' : 'fail',

      }
    })
  })
  return Promise.all(validos)
};
*/

// leer archivos y retornar objeto con propiedades href, text, file, status, ok)

/*const readFileValidos1 = (route) => fsp.readFile(route, 'utf8', (error, data) => {
  if(data){ 
    linksValidos(data).then(console.log);
    } else if (error) {
      console.error(error , 'error: no hay links validos' )
    }
  }); 

 // const readFileValidos = (route) => fsp.readFile(route, 'utf8')
 const readFileValidos = (route) => fsp.readFile(route, 'utf8')
 .then((data) => {
   console.log(linksValidos(data))
 })
 .catch((error) => {
   console.log(error + 'error: archivo no encontrado')
 })*/