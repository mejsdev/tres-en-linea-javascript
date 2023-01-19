// obtiene todos los elementos `td` (celdas de una tabla en HTML)
var cells = document.querySelectorAll("td");

// obtiene el elemento con su idenditificador unico en el DOM (documento de HTML)
var message = document.getElementById("message");

// indica que jugador esta jugando ahora, en este caso será el por dejecto
var currentPlayer = "x";

// indica la cantidad de jugadores
var players = {
    "x": 0,
    "o": 0
}

// variable que utilizaremos para saber si el juego termino o no, por defecto esta en false.
// con esto prohibiremos que el juegador siga presionando las otras celdas.
let gameOver = false;

// escucha y maneja un evento, en este caso un `click` en el elemento id `reset-button`
document.getElementById("reset-button").addEventListener("click", resetGame);

// al igual que en el anterior, se le esta proporcionando un listener de cada celda
// al hacer click
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

/*
* Esta funcion se ejecuta cada vez que se produce un evento click en alguna celda.
*/
function handleCellClick() {
    if (!gameOver) {
        if (!this.textContent) {
            this.classList.add(currentPlayer);
            if (checkWin(currentPlayer)) {
                message.textContent = currentPlayer + " wins!";
                players[currentPlayer] += 1;
                gameOver = true;
            } else if (checkDraw()) {
                message.textContent = "Draw!";
                gameOver = true;
            } else {
                currentPlayer = currentPlayer === "x" ? "o" : "x";
            }
        }
    }
}

// Funcion que verifica si el jugador ha ganado o no la partida
function checkWin(player) {
    let winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winCombinations.length; i++) {
        let [a, b, c] = winCombinations[i];
        if (cells[a].classList.contains(player) && cells[b].classList.contains(player) && cells[c].classList.contains(player)) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    /**
     * El operador de propagacion `...` realiza una copia de lo que se esta indicando puede ser 
     * cualquier arreglo o objecto iterable. En este caso esta tomando todos los elementos td
     * y los pasa a un arreglo para asignarselo a cells.
     */
    let cells = [...document.querySelectorAll("td")];
    /**
     * La function `every()` recorre cada elemento del arreglo y devuelve `true` si todos los elementos
     * cumplen la condición especificada en la function y `false` si al menos uno no lo hace.
     * 
     * En este caso, la funcion comprueba si el contenido del texto de cada celda no esta vacío.
     * Si alguna tiene contenido vació devuelve `false`
     * Si todas las celdas tienen contenido devuelve `true`, indicando que hay un empate
     */
    return cells.every(cell => cell.textContent !== "");
}

// Resetea el juego
function resetGame() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
    currentPlayer = "x";
    message.textContent = "X wins: " + players.x + " O wins: " + players.o;
    gameOver = false;
}
