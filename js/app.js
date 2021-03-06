// -------  SELECCION DE ELEMENTOS -------

// CARD CONTAINER
const gameCards = document.querySelector('#gameCards')

// CART CONTAINER
const cartContainer = document.querySelector('#cartContainer')
const totalItemsInCart = document.querySelector(".totalItemsCarrito");
const cantidadJuego = document.querySelector(".cartCantidad")

// Boton Carrito
const cartButton = document.querySelector('#cartButton')

// MODAL
const modal = document.querySelector('.modal')
const modalClose = document.querySelector('.modalClose')
const subtotal = document.querySelector(".subtotal")


let videojuegos = []

// LIMPIAR LOS PRODUCTOS
const cleanProducts = (container) => container.innerHTML = " ";


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

// RENDERIZAR LOS PRODUCTOS FILTRADOS
const filterProducts = (genero) => {
    cleanProducts(gameCards);
    videojuegos.forEach((juego) => {
      if (genero === juego.genero) {
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
      }
    })
    listenerBotonCarrito()
  };


// FUNCION PARA CAMBIAR EL COLOR DEL FILTERBUTTON CUANDO LO SELECCIONAMOS
  const cambiarColorBoton = (e) => {
    let oldActive = document.querySelectorAll(".marcar")
    
    for (let i = 0; i < oldActive.length; i++) {  // CADA VEZ QUE ENTRA EN LA FUNCION, BUSCA EL BOTON YA MARCADO PARA DESMARCARLO
        oldActive[i].classList.remove("marcar")
    }

    e.target.classList.add("marcar") // RECIEN LO MARCA AC??
  }

  let filterbuttons = document.querySelectorAll('.filter-button')

  filterbuttons.forEach((filterbutton) => {
    filterbutton.addEventListener('click', cambiarColorBoton)
  })


  //ELIMINAR FILTROS
  const eliminarFiltrados = (e) => {
    renderizarListaJuegos(videojuegos, gameCards)
  }

  let eliminarFiltro = document.querySelector('.filter-eliminar')
  eliminarFiltro.addEventListener('click', eliminarFiltrados)



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
        <button class="restarCantidad" onclick="restarCantidad(${juego.id})"> <b> - </b> </button> 
        <div class="number"> <b> ${juego.cantidad} </b> </div> 
        <button class="sumarCantidad" onclick="sumarCantidad(${juego.id})"> <b> + </b> </button>
        
        </div>
        
        <div class="borrarJuego" data-id="${juego.id}">  <img src="https://cdn-icons-png.flaticon.com/512/2891/2891491.png" alt="">  </div>
        `
        cartContainer.append(cartRow)
    })

    // BOTON DE C/CARD PARA ELIMINAR JUEGO DEL CARRITO
     document.querySelectorAll('.borrarJuego').forEach((botonDeBorrar) => {
         botonDeBorrar.addEventListener('click', eliminarJuegoDelCarrito)
     })

     totalItemsInCart.innerHTML = carrito.length

     calcularSubtotalCarrito()

}

const calcularSubtotalCarrito = () => { // LLAMAR A ESTA FUNCION CADA VEZ QUE HAGA ALGUN CAMBIO EN MI CARRITO
    let subtotalCarrito = 0

    if (carrito.length > 0) { // SOLAMENTE ENTRA EN EL FOREACH SI HAY ALGO EN EL CARRITO (SINO, AL ELIMINAR EL ULTIMO JUEGO SEGUIRIA APARECIENDO EL PRECIO DEL MISMO EN EL SUBTOTAL PORQUE NUNCA ENTRO EN EL FOREACH)
        carrito.forEach((videojuego) => {
            subtotalCarrito+= videojuego.precio * videojuego.cantidad

        if (subtotalCarrito > 8000){
            subtotalNuevo = subtotalCarrito - 500
            subtotal.innerHTML = `  <b> SUBTOTAL: <del> $${subtotalCarrito} </del> </b> &nbsp;&nbsp <b> $${subtotalNuevo} </b> `
        } else {
            subtotal.innerHTML = ` <b> SUBTOTAL: $${subtotalCarrito} </b> `
        }
        
        })
    } else{
        subtotal.innerHTML = ` <b> SUBTOTAL: $0 </b> `
        vaciarCarrito() // PONGO ESTO PARA QUE NO ME DEJE APRETAR EL BOTON DE VACIAR CARRITO O FINALIZAR COMPRA EN CASO DE QUE EL SUBTOTAL LLEGUE A 0
    }
}


const sumarCantidad = (id) => {
    const juegoAModificar = carrito.find((juego) => juego.id === id)
    juegoAModificar.cantidad++
    localStorage.setItem("carrito", JSON.stringify(carrito)) // CADA VEZ QUE HACEMOS ALGUNA MODIFICACION EN EL CARRITO, HAY QUE SETEARLO EN EL LOCAL STORAGE, PONER EL STRINGIFY DEL CARRITO, Y VOLVER A RENDERIZAR
    renderizarCarrito()
    calcularSubtotalCarrito()
}

const restarCantidad = (id) => {
    const juegoAModificar = carrito.find((juego) => juego.id === id)
    const indiceDeJuego = carrito.indexOf(juegoAModificar) // guardamos la posicion del juego en el array del carrito

    if (juegoAModificar.cantidad > 1) {
        juegoAModificar.cantidad--
        localStorage.setItem("carrito", JSON.stringify(carrito))
        renderizarCarrito()
    } 
    else {
        carrito.splice(indiceDeJuego, 1); // adentro del carrito, nos paramos en el indice del juego y eliminamos 1 (en este caso, el unico juego a modificar)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        renderizarCarrito()
    }
    calcularSubtotalCarrito()
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
            gravity: "bottom", 
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to right, violet, rgb(70, 34, 70))",
            },
            onClick: function(){}
          }).showToast();
          
    } else {
        juegoYaSeleccionado.cantidad++
    }
    
    renderizarCarrito()
    localStorage.setItem('carrito', JSON.stringify(carrito)) 
    calcularSubtotalCarrito()
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
        gravity: "bottom", 
        position: "right", 
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, red, rgb(70, 34, 70))",
        },
        onClick: function(){}
      }).showToast();

    renderizarCarrito()
    calcularSubtotalCarrito()
    
}


// Al cargar la pagina, verifico que exista algo guardado en el carrito (gracias al local storage) y lo imprimo
  if (localStorage.getItem('carrito')) {
      carrito = JSON.parse(localStorage.getItem('carrito')) // Si encuentra algo, lo parseamos para poder manipular los productos del array del carrito y, una vez convertido, llamamos a la funcion renderizarCarrito. Si no ponemos esto, cuando recarguemos la p??gina los productos a??adidos al carrito van a desaparecer.
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
            confirmButtonText: 'S??, quiero vaciar el carrito!',
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
    // Al borrar los productos del local storage, no aparecer??an de nuevo en pantalla cuando recarguemos la p??gina
    localStorage.getItem('carrito') && localStorage.removeItem('carrito') // SI ENCUENTRA ALGO EN EL CARRITO, LO BORRA
    carrito = [] // Si no vaciamos tambi??n el array del carrito, se borrar??an los productos del Local Storage pero no del array en s??, por lo que los productos seguir??an impresos en pantalla (hasta que recarguemos la p??gina)
    renderizarCarrito()
    totalItemsInCart.innerHTML = carrito.length
    calcularSubtotalCarrito()
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
            'Su precio a pagar es de $' +  montoTotal,
            'success'
        )
    } else {
        Swal.fire(
            'NO HAY NADA AGREGADO EN EL CARRITO',
            'Agrega algo al carrito antes de apretar el boton!',
            'question'
        )
    }
    
    vaciarCarrito()
    calcularSubtotalCarrito()
}



// BOTON PARA FINALIZAR COMPRA (CALCULAR TOTAL CARRITO)
const finalizarCompra = document.querySelector('.finalizarCompra')
finalizarCompra.addEventListener('click', totalCarrito)


// ------------------------------------------------


// FETCH

fetch('./data/videojuegos.json')
.then((res) => res.json())
.then((jsonResponse) => {
    videojuegos = jsonResponse.data // GUARDO EN EL ARRAY VIDEOJUEGOS (DECLARADO AL PRINCIPIO) LO QUE ENCONTRO ADENTRO DE "DATA" EN VIDEOJUGOS.JSON
    renderizarListaJuegos(videojuegos, gameCards)
})



// ---------------------------------------------------------------



const abrirCarrito = () => {
    modal.classList.add('modalOpen')
}

const cerrarCarrito = () => {
    modal.classList.remove('modalOpen')
}


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
    } else{
        cleanProducts(juegoBuscado);
    }
    
}

// Search button
buttonSearch.addEventListener('click', searchBar)

// ----------------------------------------------

// Modal
cartButton.addEventListener('click', abrirCarrito)
modalClose.addEventListener('click', cerrarCarrito)

