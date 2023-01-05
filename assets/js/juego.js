/*
*2C = Two of clubs 
*2D = Two of Diamonds
*2H = Two of Hearts 
*2S = Two of Spades 
*/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K']

// Referencias del HTML
const bntPedir = document.querySelector('#bntPedir');
const bntDetener = document.querySelector('#bntDetener');
const bntNuevo = document.querySelector('#bntNuevo');

let puntosJugador = 0;  
    puntosComputadora = 0;

const divCartasJugador = document.querySelector('#Jugador-cartas');
const divCartasComputadora = document.querySelector('#Computadora-cartas');
const puntosHTML = document.querySelectorAll('small');


//Esta funcion crea un nuevo deck
const crearDeck = () => {

    for( let i = 2 ; i <= 10 ; i++ ) {
        for ( let tipo of tipos){
            deck.push( i + tipo);
        }       
    }

    for( let tipo of tipos){
        for( let esp of especiales ){
            deck.push( esp + tipo )
        }
    }
    // console.log( deck );
    deck = _.shuffle( deck );
    console.log(deck);
    return deck;
}

crearDeck();

// Est funcion permite tomar una carta 
const pedirCarta = () => {

    if ( deck.length === 0) {
        throw 'No hay cartas en la baraja';
    }

    const carta = deck.pop();
    return carta;
}

// for ( let i = 0; i<= 100; i++){
//     pedirCarta()
// }


const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length-1 );
    return ( isNaN ( valor ) ) ? 
        (valor === 'A') ? 11 : 10
        : valor * 1; // si no es una letra hago la multiplicacion por 1

}

//Turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {

    do {
    const carta = pedirCarta();

    puntosComputadora = puntosComputadora + valorCarta( carta );
    puntosHTML[1].innerText = puntosComputadora;

    // <img class="carta" src="assets/cartas/2C.png"></img>
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png` ; //Insercion del valor de la carta
    imgCarta.classList.add('carta')
    divCartasComputadora.append( imgCarta );
    if ( puntosMinimos > 21 ) {
        break;
    }

    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );


    setTimeout(() => {
        
        if ( puntosComputadora === puntosMinimos ) {
            alert('Nadie gana ')      
        } else if ( puntosMinimos > 21 ) {
            alert('Computadora gana')
        } else if ( puntosComputadora > 21 ) {
            alert('jugador gana');
        } else {
            alert('Computadora gana')}
    }, 10);
}


// Eventos

bntPedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;

    // <img class="carta" src="assets/cartas/2C.png"></img>
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png` ; //Insercion del valor de la carta
    imgCarta.classList.add('carta')
    divCartasJugador.append( imgCarta );

    if ( puntosJugador > 21 ) {
        console.warn('has perdido la partida');
        bntPedir.disabled = true;
        bntDetener.disabled = true;
        turnoComputadora( puntosJugador );

    } else if( puntosJugador === 21 ) {
        console.warn('21 puntos!');
        bntPedir.disabled = true;
        bntDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }

});

bntDetener.addEventListener('click', () => {

    bntDetener.disabled = true;
    bntPedir.disabled = true;
    turnoComputadora( puntosJugador )

});

bntNuevo.addEventListener('click', () => {

    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    bntPedir.disabled = false;
    bntDetener.disabled = false;
})



