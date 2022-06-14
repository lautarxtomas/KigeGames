const videojuegos = []
const videojuegosProductos = []

// CONSTRUCTOR
class Videojuego {
    constructor(nombre, consola, precio, genero, imgSrc, id) {
        this.nombre = nombre
        this.consola = consola
        this.precio = precio
        this.genero = genero
        this.imgSrc = imgSrc
        this.id = id
    }
}

// JUEGOS INDEX

const juego1 = videojuegos.push(new Videojuego ('Fifa 22', 'PS4', 6000, 'deportes', 'https://i.blogs.es/0a2b76/e53cynvwuaix9pa/450_1000.jpeg', 001))
const juego2 = videojuegos.push(new Videojuego ('Persona 5', 'PS4', 4000, 'rpg', 'https://playtecgames.com/wp-content/uploads/2020/08/persona-5-royal.jpg', 002))
const juego3 = videojuegos.push(new Videojuego ('God of War', 'PS4', 5000, 'accion', 'https://m.media-amazon.com/images/I/711lrrvzt+L._SL1496_.jpg', 003))
const juego4 = videojuegos.push(new Videojuego ('Alien', 'PS4', 2000, 'terror', 'https://juegosdigitalesargentina.com/files/images/productos/1495070916-alien-isolation-the-collection-ps4.jpg', 004))
const juego5 = videojuegos.push(new Videojuego ('PES 2021', 'PS4', 3000, 'deportes', 'https://www.portalgames.com.ar/wp-content/uploads/2020/09/pes-2021.jpg', 005))



// JUEGOS PRODUCTOS

const juegoProductos1 = videojuegosProductos.push(new Videojuego ('Fifa 22', 'PS4', 6000, 'deportes', 'https://i.blogs.es/0a2b76/e53cynvwuaix9pa/450_1000.jpeg', 'F22'))
const juegoProductos2 = videojuegosProductos.push(new Videojuego ('Persona 5', 'PS4', 4000, 'rpg', 'https://playtecgames.com/wp-content/uploads/2020/08/persona-5-royal.jpg', 'P5'))
const juegoProductos3 = videojuegosProductos.push(new Videojuego ('God of War', 'PS4', 5000, 'accion', 'https://m.media-amazon.com/images/I/711lrrvzt+L._SL1496_.jpg', 'GOW4'))
const juegoProductos4 = videojuegosProductos.push(new Videojuego ('Alien', 'PS4', 2000, 'terror', 'https://juegosdigitalesargentina.com/files/images/productos/1495070916-alien-isolation-the-collection-ps4.jpg', 'AIS'))
const juegoProductos5 = videojuegosProductos.push(new Videojuego ('PES 2021', 'PS4', 3000, 'deportes', 'https://www.portalgames.com.ar/wp-content/uploads/2020/09/pes-2021.jpg', 'PES2021'))
const juegoProductos6 = videojuegosProductos.push(new Videojuego ('Elden Ring', 'PS4', 7500, 'rpg', 'https://cdn2.spong.com/pack/e/l/eldenring455877l/_-Elden-Ring-PS4-_.jpg', 'ELDEN'))
const juegoProductos7 = videojuegosProductos.push(new Videojuego ('Battlefield 1', 'PS4', 1000, 'shooter', 'https://m.media-amazon.com/images/I/81zk93c4ZoL._SX425_.jpg', 'BF1'))
const juegoProductos8 = videojuegosProductos.push(new Videojuego('Ghostwire Tokyo', 'PS5', 7500, 'accion', 'https://d3ugyf2ht6aenh.cloudfront.net/stores/002/070/737/products/ghostwire_tokyo-56201001-f0e71f1c9121043fa316473598447927-1024-1024.jpg', 'GWT'))
const juegoProductos9 = videojuegosProductos.push(new Videojuego('Spiderman', 'PS4', 1500, 'accion', 'http://d3ugyf2ht6aenh.cloudfront.net/stores/001/067/161/products/spiderman-cover-web1-184dc2d745e3baf2a115757759186392-640-0.png', 'spider'))
const juegoProductos10 = videojuegosProductos.push(new Videojuego('Injustice 2', 'PS4', 1000, 'lucha', 'http://d3ugyf2ht6aenh.cloudfront.net/stores/353/484/products/best1-9e72856dcd3c9204c815863800631331-640-0.jpg', 'INJ2'))
