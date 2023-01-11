const mdLinks = require('../index');


describe('mdLinks', () => {

  /*it('should...', () => {
    console.log('FIX ME!');
  });
  /*it('deberia devolver una promesa', () => {
   expect(mdLinks()).toBe(typeof Promise)
  }); */
  it('debe rechazar cuando el path no existe', () => {
    mdLinks('/noexiste/').catch((error)=> {
      expect(error).toBe('error: La ruta no existe')
    })
   
   });

});


/* Promise.All
npm install node-fetch
const fetch = require("node-fetch")
npm install node-fetch@v2
TDD test driven development
*/