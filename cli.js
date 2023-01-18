const {
    statsFun,
    statsValidate,
    mdLinks
} = require('./index.js');

const optionInput = process.argv;
const route = process.argv[2];
const validate = optionInput.includes('--validate');
const stats = optionInput.includes('--stats');

const cli = (route) => {
    if (!route) {
        console.log('Error: No ingresaste path')
    }
    else if (stats) {
        return mdLinks(route, { validate: false })
            .then((links) => {
                if (links.length <= 0) {
                    console.log('error: archivo sin links')
                }
                const statsCli = statsFun(links)
                console.log(`Links: 
        total: ${statsCli.Total}
        unicos: ${statsCli.Unicos}`
                )
            })
            .catch((error) => (error))
    }
    else if (validate) {
        return mdLinks(route, { validate: true })
            .then((links) => {
                if (links.length <= 0) {
                    console.log('error archivo sin links')
                }
                links.forEach(link => {
                    console.log(`Route: ${link.file} 
          Links: ${links.href}
          Text: ${links.text}
          Status: ${links.status}
          Ok: ${links.ok}
        
        `)

                });
            })
            .catch((error) => (error))

    }
    else if(stats && validate){
        return mdLinks(route, {validate : true})
        .then((links) => {
            if(links.length <= 0){
                console.log('error: archivo sin links')
            }
            const statsAndValidate = statsValidate(links)
            console.log(` LINKS:
            Total: ${statsAndValidate.Total},
            Unique: ${statsAndValidate.unicos},
            Broken: ${statsandValidate.Broken}
              `)
        })
        .catch((error) => (error))

    }
    else if(validate){
        return mdLinks(route, {validate:false})
       .then((links) => {
         if(links.length <= 0){
            console.log('error archivo sin links')
         }
           links.forEach((link) =>{
     Console.log(`
     Route: ${link.file},
     Link:${link.href},
     Text:${link.text}`)
           })
           })
           .catch((error) => log(error))

}
}
cli('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md')











/*mdLinks('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md')
.then(() => {})
.catch((error) => {
    console.log(error)
})
*/


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

//console.log('probando', pathCheck('doc/Prueba.txt'))

//statsValidate('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md')