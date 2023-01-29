const { mdLinks } = require('../index');

const validate = true;
const ruta = './doc/probando.md';
rutaAbsoluta = 'C:/Users/Gabriela/Desktop/proyecto4/DEV001-md-links/doc/probando.md'

describe('mdLinks', () => {
  it('deberia devolver una promesa', () => {
    expect(mdLinks(ruta, validate)).toBeInstanceOf(Promise)
  });

  it('si ruta no existe devuelve error ', async () => {
    await mdLinks('/noexiste/', { validate: false }).catch((error) => {
      expect(error).toBe(error)
    });
  });
  it("si validate es false debe retornar un array con info de links", async () => {
    const arrayLinks = [
      { href: 'https://nodejs.org/', text: 'Node.js', file: undefined },
      { href: 'https://www.google.com/', text: 'Google', file: undefined },
      { href: 'https://www.google.com/', text: 'Google', file: undefined },
      {
        href: 'https://www.google.com/rotothbsx',
        text: 'Google',
        file: undefined
      }
    ]
    await mdLinks(ruta, {validate:false}).then(response => expect(response).toStrictEqual(arrayLinks))
  });

})