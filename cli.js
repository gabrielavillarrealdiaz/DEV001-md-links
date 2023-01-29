#!/usr/bin/env node
const chalk = require('chalk');
const {
    mdLinks,
    linksTotal,
    linksUnique,
    linksBroken
} = require('./index.js');



const optionInput = process.argv;
const route = process.argv[2];

const validate = optionInput.includes('--validate');
const stats = optionInput.includes('--stats');
const help = optionInput.includes('--help');
const validateystats = optionInput.includes( '--validate--stats') //||'--stats--validate' ....como hacer que se pueda invertir el comando?

const helptext = () => {
    console.log('\n' + chalk.green('aqui va instrucciones :)'));
    console.log('\n' + chalk.yellow('aqui va instrucciones :)'));
    console.log('\n' + chalk.red('aqui va instrucciones :)'));
}

const cli = (route) => {
    if (!route) {
    console.log('\n' + chalk.red('Error: Ingresa ruta de un archivo para comenzar'))
    helptext()
      
    }
    else if (help) {
     console.log('heps')
     helptext()
    }
    else if (validateystats) {
                return mdLinks(route, { validate: false })
        .then((links) => {
            // console.log('estos son links en stats', links)
            if (links.length === 0) {
                console.log('\n' + chalk.red('error: archivo sin links'));
            }
            console.log('\n' + chalk.yellowBright('Links en archivo:')) 
            console.log(
                'Total:' + linksTotal(links) + ' ',
                'Unicos:' + linksUnique(links) + ' ',
                'Broken:' + linksBroken(links) + ' ')
                
                  })
        .catch((error) => (error))
       }
    else if (stats) {
        return mdLinks(route, { validate: false })
            .then((links) => {
                // console.log('estos son links en stats', links)
                if (links.length === 0) {
                    console.log('\n' + chalk.red('error: archivo sin links'));
                }
                console.log('\n' + chalk.blueBright('Links en archivo:')) 
                
                console.log('\n' + chalk.blueBright(  'Total:' + linksTotal(links) + ' ',
                    'Unicos:' + linksUnique(links) + ' '
                ))

            })
            .catch((error) => (error))
    }
    else if (validate) {
        return mdLinks(route, { validate: true })
            .then((links) => {
                //console.log('estos son los link', links)
                if (links.length === 0) {
                    console.log('\n' + chalk.red('error archivo sin links'))
                }
                console.log('\n' + chalk.bgBlue.bold('Validate Links'))
                links.forEach(links => {
                                       console.log(`
          Route: ${links.file} 
          Links: ${links.href}
          Text: ${links.text}
          Status: ${links.status}
          ok: ${links.ok}`)

                });
            })
            .catch((error) => (error))

    } 
    else if (!validate) {
        return mdLinks(route, { validate: true })
            .then((links) => {
                if (links.length === 0) {
                    console.log('\n' + chalk.red('error archivo sin links'))
                }
                console.log('\n' + chalk.bgMagenta.bold('Links en archivo'))
                links.forEach((links) => {
                    console.log(`
     Route: ${links.file}
     Link:${links.href}
     Text:${links.text}`)
                })
            })
            .catch((error) => console.log(error))

    }
}

cli(route)

/*
mdLinks('./doc/probando.md', optionInput)
.then((response) => {
    console.log('mdlink respuesta', response)
})
.catch((error) => {
    console.log(error)
})
*/
//'./doc/probando.md'

//'C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md'