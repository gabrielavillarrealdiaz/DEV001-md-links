const { mdLinks } = require('..index.js');
const fetch = require("node-fetch");
jest.mock("node-fetch");

const validate = true;
const ruta = './doc/probando.md';

describe('mdLinks', () => {

 it.only('deberia devolver una promesa', () => {
   expect(mdLinks(ruta, validate)).toBeInstanceOf(typeof Promise)
  }); 

  it('debe rechazar cuando el path no existe', () => {
    mdLinks('/noexiste/').catch((error)=> {
      expect(error).toBe(new Error('error: La ruta no existe'))
    })
   
   });
   it('deberia devolver array  con propiedades', () => {
    expect(mdLinks('C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md')).resolves.toStrictEqual(
      [
        {
          href: 'https://nodejs.org/',
          text: 'Node.js',
          file: 'C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md'
        },
        {
          href: 'https://www.google.com/',
          text: 'Google',
          file: 'C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md'
        }
      ]
    );
});

});


/* Promise.All
npm install node-fetch
const fetch = require("node-fetch")
npm install node-fetch@v2
TDD test driven development
*/