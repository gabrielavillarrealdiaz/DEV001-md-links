const path = require('path');
const fs = require('fs');
const fsp = require('fs/promises');
const fetch = require('node-fetch');

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