// JUEGOS DEL INDEX

const gameCards = document.querySelector('#gameCards')

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

// JUEGOS DE LA SECCION PRODUCTOS ---> CUANDO DESCOMENTO ESTO, NO SOLO QUE NO SE RENDERIZAN LAS CARDS DEL ARRAY videojuegosProductos en el containerProductos (que esta en productos.html), sino que hace que no me anden los botones de añadir al carrito.

// const containerProductos = document.querySelector('#containerProductos')

// videojuegosProductos.forEach((juego) => {
//     const card = document.createElement('div')
//     card.classname = 'card'
//     card.innerHTML = `
//             <h3 class="cardTitle"> ${juego.nombre} </h3>
//             <img src="${juego.imgSrc}" class="cardImg">
//             <p class="cardDesc"> ${juego.consola} </p>
//             <span class="cardPrice"> $${juego.precio} </span>
//             <button data-id="${juego.id}" class="buttonCTA"> Agregar al Carrito </button>
//         `
//     containerProductos.append(card)

// })



let carrito = []


const cartContainer = document.querySelector('#cartContainer')

// Funcion para imprimir el carrito cada vez que se actualiza el array
const imprimirCarrito = () => {
    cartContainer.innerHTML = ''
    carrito.forEach((juego) => {
        const cartRow = document.createElement('div')
        cartRow.className = 'cartRow'
        cartRow.innerHTML = `
        <div class="cartImg">
        <img src="${juego.imgSrc}">
        </div>
        <div class="cartTitle"><b> ${juego.nombre}</b></div>
        <div class="cartDesc"><b> ${juego.consola}</b></div>
        <div class="cartPrice"><b> $${juego.precio}</b></div>
        `
        cartContainer.append(cartRow)
    })
}

// FUNCION PARA APLICAR DESCUENTO Y FUNCION PARA CALCULAR TOTAL CARRITO

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
    vaciarCarrito()
}
    

// EVENTOS

const addGame = (e) => {
   
    const juegoElegido = e.target.getAttribute('data-id')
    const videojuego = videojuegos.find((juego) => juego.id ==  juegoElegido)
    carrito.push(videojuego)
    imprimirCarrito()
    localStorage.setItem('carrito', JSON.stringify(carrito)) 
}

// BOTONES PARA AGREGAR JUEGOS AL CARRITO
const botonesCompra = document.querySelectorAll('.buttonCTA')
botonesCompra.forEach((botonCompra) => {
    botonCompra.addEventListener('click', addGame)
})

// Al cargar la pagina, verifico que exista algo guardado en el carrito (gracias al local storage) y lo imprimo
if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito')) // Si encuentra algo, lo parseamos para poder manipular los productos del array del carrito y, una vez convertido, llamamos a la funcion imprimirCarrito. Si no ponemos esto, cuando recarguemos la página los productos añadidos al carrito van a desaparecer.
    imprimirCarrito()
}


// BOTON PARA VACIAR EL CARRITO

const vaciarCarrito = () => {
    if (localStorage.getItem('carrito')) {
        localStorage.removeItem('carrito') // Al borrar los productos del local storage, no aparecerían de nuevo en pantalla cuando recarguemos la página
    }
    carrito = [] // Si no vaciamos también el array del carrito, se borrarían los productos del Local Storage pero no del array en sí, por lo que los productos seguirían impresos en pantalla (hasta que recarguemos la página)
    imprimirCarrito()
}

const vaciarCarritoBtn = document.querySelector('#vaciarCarrito')
vaciarCarritoBtn.addEventListener('click', vaciarCarrito)

// --------------------------------------

// BOTON PARA FINALIZAR COMPRA
const finalizarCompra = document.querySelectorAll('.finalizarCompra')
finalizarCompra.forEach((botonFinalizar) => {
    botonFinalizar.addEventListener('click', totalCarrito)
})

// ------------------------------------------------


// ------------ SEARCH ------------


let busquedaJuego = []

const juegoBuscado = document.querySelector('.juegoBuscado')
const formSearch = document.querySelector('#searchForm')
const formInput = document.querySelector('#searchInput')

const realizarBusqueda = (e) => {
    e.preventDefault()
    let busquedaUsuario = formInput.value
    let resultadoBusqueda = videojuegos.filter(
        (videojuego) => videojuego.nombre.toLowerCase().includes(busquedaUsuario.toLowerCase())
    );
    busquedaJuego.push(resultadoBusqueda)
    console.log(resultadoBusqueda)
    renderizarBusqueda()
}

formSearch.addEventListener('submit', realizarBusqueda)

 const renderizarBusqueda = () => {
     juegoBuscado.innerHTML = ''
     busquedaJuego.forEach((juego) => {
         const card = document.createElement('div')
         card.className = 'card'
         card.innerHTML = `
             <h3 class="cardTitle"> ${juego.nombre} </h3>
             <img src="${juego.imgSrc}" class="cardImg">
             <p class="cardDesc"> ${juego.consola} </p>
             <span class="cardPrice"> $${juego.precio} </span>
             <button data-id="${juego.id}" class="buttonCTA"> Agregar al Carrito </button>
         `
     juegoBuscado.append(card)
     })
 }

//  FIN SEARCH


// FILTER CON PROMPT

// const agregarJuego = () => {
//  let busqueda = prompt('Que videojuego estás buscando?:').toLowerCase();
//  const resultadoBusqueda = videojuegos.filter(
//      (videojuego) => videojuego.nombre.toLowerCase().includes(busqueda.toLowerCase())
//      );

//  //  Se crea un nuevo array con el juego buscado en caso de incluir el string ingresado en su nombre original. En este array temporal solo va a poder existir un juego por vuelta, por lo tanto, cuando lo agreguemos al carrito, va a ser usando de parametro resultadoBusqueda[0].
     
// // Este if indica que si en el array creado con el filter hay por lo menos un juego, agregue el mismo al carrito
//        if (resultadoBusqueda.length === 1){
//         agregarAlCarrito(resultadoBusqueda[0]);
//        } else {
//            alert ('No tenemos ese videojuego o no lo buscó correctamente. Ingrese otro:')
//            agregarJuego()
//        }
//    }

//       const agregarAlCarrito = (videojuego) => {
//           alert(`Nombre: ${videojuego.nombre} \nPrecio: ${videojuego.precio}`);

//        if (confirm(`¿Desea agregar ${videojuego.nombre} al carrito?`)) {

//          carrito.push(videojuego);
//          if (confirm("Desea agregar otro juego?")) {

//            agregarJuego()

//          } else {
//               alert('Puede seguir agregando juegos al carrito o apretar el botón de finalizar compra para ver su monto total')
//               imprimirCarrito()
//         }
//       } else {
//           agregarJuego()
//       }     

//    }


//    agregarJuego()
