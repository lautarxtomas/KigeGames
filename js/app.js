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
     constructor(nombre, consola, precio, genero) {
         this.nombre = nombre
         this.consola = consola
         this.precio = precio
         this.genero = genero
     }
 }

 const juego1 = videojuegos.push(new Videojuego ('Fifa 22', 'PS4', 6000, 'deportes'))
 const juego2 = videojuegos.push(new Videojuego ('Persona 5', 'PS4', 4000, 'rpg'))
 const juego3 = videojuegos.push(new Videojuego ('God of War', 'PS5', 5000, 'accion'))
 const juego4 = videojuegos.push(new Videojuego ('Alien', 'PS4', 2000, 'terror'))
 const juego5 = videojuegos.push(new Videojuego ('PES 2021', 'PS4', 3000, 'deportes'))

 const carrito = []

 const totalCarrito = () => {
    let montoTotal = 0
    carrito.forEach((videojuego) => {
        montoTotal = montoTotal + videojuego.precio
    })
    return montoTotal
}

function descuento(total, descuento) {
    let res = total - descuento
    alert('Por esta semana usted obtiene un descuento de $' + descuento + ' al pasar los $8000. Su precio a pagar es de $' + res)
}

// FILTER

const agregarJuego = () => {

 let busqueda = prompt('Que videojuego estás buscando?:').toLowerCase();
 const resultadoBusqueda = videojuegos.filter(
     (videojuego) => videojuego.nombre.toLowerCase().includes(busqueda.toLowerCase())
     );
    //  Se crea un nuevo array con el juego buscado en caso de incluir el string ingresado en su nombre original. En este array temporal solo va a poder existir un juego por vuelta.

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

        if (totalCarrito() >= 8000){
            descuento (totalCarrito(), 500)
        } 
        else{
        alert('Su compra ha sido realizada. Su monto total a pagar es de $' + totalCarrito())
        }
            
            console.log(carrito)
            alert('MUCHAS GRACIAS POR TU COMPRA! VUELVA PRONTO!')
      }

    } else {
        agregarJuego()
    }     
  
}
  
  
agregarJuego()
