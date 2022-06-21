// SELECCION DE ELEMENTOS
const gameCards = document.querySelector('#gameCards')
const cartContainer = document.querySelector('#cartContainer')
const totalItemsInCart = document.querySelector(".totalItemsCarrito");
const subtotal = document.querySelector(".subtotal")





// JUEGOS DEL INDEX

renderizarListaJuegos = (array, container) => {
    container.innerHTML = ''
    array.forEach((juego) => {
        const card = document.createElement('div')
        card.className = 'card'
        card.innerHTML = `
                <h3 class="cardTitle"> ${juego.nombre} </h3>
                <img src="${juego.imgSrc}" class="cardImg">
                <p class="cardDesc"> ${juego.consola} </p>
                <span class="cardPrice"> $${juego.precio} </span>
                <button data-id="${juego.id}" class="buttonCTA"> Agregar al Carrito </button>
            `
        container.append(card)
    })
    listenerBotonCarrito()
}


let carrito = []


// ELIMINAR JUEGO DEL CARRITO

const eliminarJuegoDelCarrito = (e) => {
    const juegoIdSelected = e.target.closest('.borrarJuego').getAttribute('data-id')
    carrito = carrito.filter((juego) => juego.id != juegoIdSelected)
    renderizarCarrito()
}



// Funcion para renderizar el carrito cada vez que se actualiza el array
const renderizarCarrito = () => {
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
        
        <div class="borrarJuego" data-id="${juego.id}">  <img src="https://cdn-icons-png.flaticon.com/512/2891/2891491.png" alt="">  </div>
        `
        cartContainer.append(cartRow)
    })

     document.querySelectorAll('.borrarJuego').forEach((botonDeBorrar) => {
         botonDeBorrar.addEventListener('click', eliminarJuegoDelCarrito)
     })

     totalItemsInCart.innerHTML = carrito.length
    
}

// FUNCION PARA CALCULAR TOTAL CARRITO Y APLICAR DESCUENTO

function descuento(total, descuento) {
    let res = total - descuento
    alert('Por esta semana usted obtiene un descuento de $' + descuento + ' al pasar los $8000. Su precio a pagar es de $' + res)
}

const totalCarrito = () => {
    let montoTotal = 0
    carrito.forEach((videojuego) => {
        montoTotal+= videojuego.precio
    })

    montoTotal >= 8000 ? descuento(montoTotal, 500) : alert('Su precio a pagar es de $' + montoTotal)

    // LO DE ARRIBA ES IGUAL QUE ESTO

    // if (montoTotal >= 8000){
    //         descuento (montoTotal, 500)
    // } else {
    //     alert('Su precio a pagar es de $' + montoTotal)
    // }

    alert('MUCHAS GRACIAS POR SU COMPRA!')
    vaciarCarrito()
}
    
// --------------------------------------

// BOTONES PARA AGREGAR JUEGOS AL CARRITO

const agregarJuegoAlCarrito = (e) => {
   
    const juegoElegido = e.target.getAttribute('data-id')
    const videojuego = videojuegos.find((juego) => juego.id ==  juegoElegido)
    carrito.push(videojuego)
    renderizarCarrito()
    localStorage.setItem('carrito', JSON.stringify(carrito)) 
}

const listenerBotonCarrito = () => {
    const botonesCompra = document.querySelectorAll('.buttonCTA')
    botonesCompra.forEach((botonCompra) => {
        botonCompra.addEventListener('click', agregarJuegoAlCarrito)
    })
}

// Al cargar la pagina, verifico que exista algo guardado en el carrito (gracias al local storage) y lo imprimo
  if (localStorage.getItem('carrito')) {
      carrito = JSON.parse(localStorage.getItem('carrito')) // Si encuentra algo, lo parseamos para poder manipular los productos del array del carrito y, una vez convertido, llamamos a la funcion renderizarCarrito. Si no ponemos esto, cuando recarguemos la página los productos añadidos al carrito van a desaparecer.
      renderizarCarrito()
  }

 

const vaciarCarrito = () => {
    // Al borrar los productos del local storage, no aparecerían de nuevo en pantalla cuando recarguemos la página
    localStorage.getItem('carrito') && localStorage.removeItem('carrito') // SI ENCUENTRA ALGO EN EL CARRITO, LO BORRA
    carrito = [] // Si no vaciamos también el array del carrito, se borrarían los productos del Local Storage pero no del array en sí, por lo que los productos seguirían impresos en pantalla (hasta que recarguemos la página)
    renderizarCarrito()
    totalItemsInCart.innerHTML = carrito.length
}

// BOTON PARA VACIAR EL CARRITO
const vaciarCarritoBtn = document.querySelector('#vaciarCarrito')
// vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
vaciarCarritoBtn.addEventListener('click', () => {
    Swal.fire({
        title: 'Estas seguro?',
        text: "No vas a poder deshacerlo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, quiero vaciar el carrito!'
      }).then((result) => {
        if (result.isConfirmed) {
        vaciarCarrito(),
          Swal.fire(
            'Carrito vaciado!',
            'El carrito fue vaciado correctamente.',
            'success'
          )
        }
      })
})


// BOTON PARA FINALIZAR COMPRA
const finalizarCompra = document.querySelector('.finalizarCompra')
finalizarCompra.addEventListener('click', totalCarrito)


// ------------------------------------------------


// ------------ SEARCH BAR ------------


const juegoBuscado = document.querySelector('#juegoBuscado')
const formInput = document.querySelector('#searchInput')
const buttonSearch = document.querySelector('#searchButton')

const searchBar = () => {
    const busquedaUsuario = formInput.value.toLowerCase()
    const resultadoBusqueda = videojuegos.filter(
        (videojuego) => videojuego.nombre.toLowerCase().includes(busquedaUsuario)
    );
    
    if (busquedaUsuario != ''){
        renderizarListaJuegos(resultadoBusqueda, juegoBuscado)
    }
    
}

buttonSearch.addEventListener('click', searchBar)


//  FIN SEARCH



// LLAMADOS

renderizarListaJuegos(videojuegos, gameCards)
// renderizarListaProductos(videojuegosProductos)

