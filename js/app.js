// SELECCION DE ELEMENTOS
const gameCards = document.querySelector('#gameCards')
const cartContainer = document.querySelector('#cartContainer')
const totalItemsInCart = document.querySelector(".totalItemsCarrito");
const subtotal = document.querySelector(".subtotal")
const cantidadJuego = document.querySelector(".cartCantidad")


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

// CARRITO


let carrito = []


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
        <div class="cartCantidad"> 
        <button class="restarCantidad" onclick="modificarCantidad("minus", ${juego.id})"> <b> - </b> </button> 
        <div class="number"> <b> ${juego.cantidad} </b> </div> 
        <button class="sumarCantidad" onclick="modificarCantidad("plus", ${juego.id})"> <b> + </b> </button>
        
        </div>
        
        <div class="borrarJuego" data-id="${juego.id}">  <img src="https://cdn-icons-png.flaticon.com/512/2891/2891491.png" alt="">  </div>
        `
        cartContainer.append(cartRow)
    })

    // MODIFICAR CANTIDAD DE JUEGOS

    // const modificarCantidad = (accion, id) => {
    //     const juegoIdSelected = e.target.getAttribute('data-id')
    //     const juegoAModificar = carrito.find((juego) => juego.id == juegoIdSelected)
    
    //         if (id === juegoAModificar.id) {
    //             if (accion === "minus" && numberOfUnits > 1) {
    //                 numberOfUnits--
    //             } else if (accion === "plus"){
    //                 numberOfUnits++
    //             }
    //         }
    
    // }


    // BOTON DE C/CARD PARA ELIMINAR JUEGO DEL CARRITO
     document.querySelectorAll('.borrarJuego').forEach((botonDeBorrar) => {
         botonDeBorrar.addEventListener('click', eliminarJuegoDelCarrito)
     })

     totalItemsInCart.innerHTML = carrito.length
    
}


// FUNCION PARA AGREGAR JUEGOS AL CARRITO
const agregarJuegoAlCarrito = (e) => {
   
    const juegoIdSelected = e.target.getAttribute('data-id')
    const videojuegoSelected = videojuegos.find((juego) => juego.id == juegoIdSelected)

    const juegoParaAgregar = {
        ...videojuegoSelected,
        cantidad: 1
    }

    const juegoYaSeleccionado = carrito.find((juego) => juego.id == juegoParaAgregar.id)

    if (!juegoYaSeleccionado) { // SI NO ENCUENTRA EN EL CARRITO EL JUEGO SELECCIONADO, LO AGREGA
        carrito.push(juegoParaAgregar) // UNICAMENTE LOS VIDEOJUEGOS QUE ESTEN ADENTRO DEL CARRITO VAN A TENER LA PROPIEDAD "CANTIDAD", YA QUE VIENEN DEL NUEVO OBJETO juegoParaAgregar
        
        Toastify({
            text: `${videojuegoSelected.nombre} agregado al carrito`,
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, violet, rgb(70, 34, 70))",
            },
            onClick: function(){} // Callback after click
          }).showToast();
          
    } else {
        juegoYaSeleccionado.cantidad++

    }
    
    console.log(juegoYaSeleccionado)

    renderizarCarrito()
    localStorage.setItem('carrito', JSON.stringify(carrito)) 
}

// BOTON PARA AGREGAR JUEGO AL CARRITO
const listenerBotonCarrito = () => {
    const botonesCompra = document.querySelectorAll('.buttonCTA')
    botonesCompra.forEach((botonCompra) => {
        botonCompra.addEventListener('click', agregarJuegoAlCarrito)
    })
}

// ELIMINAR JUEGO DEL CARRITO
const eliminarJuegoDelCarrito = (e) => {
    const juegoIdSelected = e.target.closest('.borrarJuego').getAttribute('data-id')
    carrito = carrito.filter((juego) => juego.id != juegoIdSelected)
    localStorage.setItem('carrito', JSON.stringify(carrito)) // CUANDO BORRAMOS UN VALUE (JUEGO) DEL CARRITO, CON ESTA LINEA HAGO ALGO SIMILAR A LO QUE HICE ARRIBA SOLO QUE APLICANDOSELO AL LOCALSTORAGE
    
    Toastify({
        text: `El juego ha sido eliminado del carrito`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, red, rgb(70, 34, 70))",
        },
        onClick: function(){} // Callback after click
      }).showToast();

    renderizarCarrito()
}


// Al cargar la pagina, verifico que exista algo guardado en el carrito (gracias al local storage) y lo imprimo
  if (localStorage.getItem('carrito')) {
      carrito = JSON.parse(localStorage.getItem('carrito')) // Si encuentra algo, lo parseamos para poder manipular los productos del array del carrito y, una vez convertido, llamamos a la funcion renderizarCarrito. Si no ponemos esto, cuando recarguemos la página los productos añadidos al carrito van a desaparecer.
      renderizarCarrito()
  }

    
// --------------------------------------



// BOTON PARA VACIAR EL CARRITO
const vaciarCarritoBtn = document.querySelector('#vaciarCarrito')
// vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
vaciarCarritoBtn.addEventListener('click', () => {
    if (localStorage.getItem('carrito')) {  // VERIFICO QUE EXISTA ALGO EN EL CARRITO CUANDO APRIETO EL BOTON DE VACIAR ANTES DE EJECUTAR EL ALERT
        
        Swal.fire({
            title: 'Estas seguro?',
            text: "No vas a poder deshacerlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, quiero vaciar el carrito!',
            cancelButtonText: 'Cancelar'
            
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

    } else { 
        Swal.fire(
            'NO HAY NADA POR VACIAR EN EL CARRITO',
            'Agrega algo al carrito antes de apretar el boton!',
            'question'
        )
    }
   
})

// FUNCION PARA VACIAR EL CARRITO
const vaciarCarrito = () => {
    // Al borrar los productos del local storage, no aparecerían de nuevo en pantalla cuando recarguemos la página
    localStorage.getItem('carrito') && localStorage.removeItem('carrito') // SI ENCUENTRA ALGO EN EL CARRITO, LO BORRA
    carrito = [] // Si no vaciamos también el array del carrito, se borrarían los productos del Local Storage pero no del array en sí, por lo que los productos seguirían impresos en pantalla (hasta que recarguemos la página)
    renderizarCarrito()
    totalItemsInCart.innerHTML = carrito.length
}

// ------------------------------------------------------

// FUNCION PARA CALCULAR TOTAL CARRITO Y APLICAR DESCUENTO
function descuento(total, descuento) {
    let res = total - descuento
    Swal.fire(
        'GRACIAS POR TU COMPRA!',
        'Por esta semana usted obtiene un descuento de $' + descuento + ' al pasar los $8000. Su precio a pagar es de $' + res,
        'success'
      )
}

// FUNCION PARA CALCULAR TOTAL CARRITO
const totalCarrito = () => {
    let montoTotal = 0
    carrito.forEach((videojuego) => {
        montoTotal+= videojuego.precio * videojuego.cantidad
    })

    if (localStorage.getItem('carrito')) {  // VERIFICO QUE EXISTA ALGO EN EL CARRITO CUANDO APRIETO EL BOTON DE FINALIZAR
        montoTotal >= 8000 ? descuento(montoTotal, 500) : 
        Swal.fire(
            'GRACIAS POR TU COMPRA!',
            'Su precio a pagar es de $' + montoTotal,
            'success'
        )
    } else {
        Swal.fire(
            'NO HAY NADA AGREGADO EN EL CARRITO',
            'Agrega algo al carrito antes de apretar el boton!',
            'question'
        )
    }
    
    // LO DE ARRIBA ES IGUAL QUE ESTO

    // if (montoTotal >= 8000){
    //         descuento (montoTotal, 500)
    // } else {
    //     alert('Su precio a pagar es de $' + montoTotal)
    // }

    // Swal.fire('MUCHAS GRACIAS POR SU COMPRA!')

    vaciarCarrito()
}


// BOTON PARA FINALIZAR COMPRA (CALCULAR TOTAL CARRITO)
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


// ----------------------------------------------


// LLAMADOS

renderizarListaJuegos(videojuegos, gameCards)
// renderizarListaProductos(videojuegosProductos)

