 alert('BIENVENIDO A KIGE GAMES')
 
 alert(`Juegos disponibles del mes: 
 - Fifa 22 - PS4 - $6000
 - Persona 5 - PS4 - $4000
 - God of War - PS5 - $5000
 - Alien - PS4 - $2000
 - Pes 2021 - PS4 - $3000
 - Pronto muchos más!`)

const videojuegos = []

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

 const juego1 = videojuegos.push(new Videojuego ('Fifa 22', 'PS4', 6000, 'deportes', 'https://i.blogs.es/0a2b76/e53cynvwuaix9pa/450_1000.jpeg', 'F22'))
 const juego2 = videojuegos.push(new Videojuego ('Persona 5', 'PS4', 4000, 'rpg', 'https://playtecgames.com/wp-content/uploads/2020/08/persona-5-royal.jpg', 'P5'))
 const juego3 = videojuegos.push(new Videojuego ('God of War', 'PS4', 5000, 'accion', 'https://m.media-amazon.com/images/I/711lrrvzt+L._SL1496_.jpg', 'GOW4'))
 const juego4 = videojuegos.push(new Videojuego ('Alien', 'PS4', 2000, 'terror', 'https://juegosdigitalesargentina.com/files/images/productos/1495070916-alien-isolation-the-collection-ps4.jpg', 'AIS'))
 const juego5 = videojuegos.push(new Videojuego ('PES 2021', 'PS4', 3000, 'deportes', 'https://www.portalgames.com.ar/wp-content/uploads/2020/09/pes-2021.jpg', 'PES2021'))


//  ----------- DOM -----------

const gameCards = document.getElementById('gameCards')

videojuegos.forEach((juego) => {
    const card = document.createElement('div')
    card.className = 'card'
    card.innerHTML = `
            <h3 class="cardTitle"> ${juego.nombre} </h3>
            <img src="${juego.imgSrc}" class="cardImg">
            <p class="cardDesc"> ${juego.consola} </p>
            <span class="cardPrice"> $${juego.precio} </span>
            <button data-id="${juego.id}" class="buttonCTA"> Agregar al Carrito </button>
        `
    gameCards.append(card)
})

const carrito = []

function descuento(total, descuento) {
    let res = total - descuento
    alert('Por esta semana usted obtiene un descuento de $' + descuento + ' al pasar los $8000. Su precio a pagar es de $' + res)
}

const totalCarrito = () => {
    let montoTotal = 0
    carrito.forEach((videojuego) => {
        montoTotal = montoTotal + videojuego.precio
    })
    if (montoTotal >= 8000){
            descuento (montoTotal, 500)
    } else {
        alert('Su precio a pagar es de $' + montoTotal)
    }
    alert('MUCHAS GRACIAS POR SU COMPRA!')
}
    

// EVENTOS

const addGame = (e) => {
   
    const juegoElegido = e.target.getAttribute('data-id')
    const videojuego = videojuegos.find((juego) => juego.id ==  juegoElegido)
    carrito.push(videojuego)
    console.log(carrito)
}

// BOTONES PARA AGREGAR JUEGOS AL CARRITO
const botonesCompra = document.querySelectorAll('.buttonCTA')
botonesCompra.forEach((botonCompra) => {
    botonCompra.addEventListener('click', addGame)
})


// BOTON PARA FINALIZAR COMPRA
const finalizarCompra = document.querySelectorAll('.finalizarCompra')
finalizarCompra.forEach((botonFinalizar) => {
    botonFinalizar.addEventListener('click', totalCarrito)
})

// ------------------------------------------------


// FILTER

const agregarJuego = () => {
 let busqueda = prompt('Que videojuego estás buscando?:').toLowerCase();
 const resultadoBusqueda = videojuegos.filter(
     (videojuego) => videojuego.nombre.toLowerCase().includes(busqueda.toLowerCase())
     );

 //  Se crea un nuevo array con el juego buscado en caso de incluir el string ingresado en su nombre original. En este array temporal solo va a poder existir un juego por vuelta, por lo tanto, cuando lo agreguemos al carrito, va a ser usando de parametro resultadoBusqueda[0].
     
// Este if indica que si en el array creado con el filter hay por lo menos un juego, agregue el mismo al carrito
       if (resultadoBusqueda.length === 1){
        agregarAlCarrito(resultadoBusqueda[0]);
       } else {
           alert ('No tenemos ese videojuego o no lo buscó correctamente. Ingrese otro:')
           agregarJuego()
       }
   }

      const agregarAlCarrito = (videojuego) => {
          alert(`Nombre: ${videojuego.nombre} \nPrecio: ${videojuego.precio}`);

       if (confirm(`¿Desea agregar ${videojuego.nombre} al carrito?`)) {

         carrito.push(videojuego);
         if (confirm("Desea agregar otro juego?")) {

           agregarJuego()

         } else {
              alert('Puede seguir agregando juegos al carrito o apretar el botón de finalizar compra para ver su monto total')
              console.log(carrito)
        }
      } else {
          agregarJuego()
      }     

   }


   agregarJuego()