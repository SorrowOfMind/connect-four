const squares = document.querySelectorAll('.board div');
const currentPlayerDisplay = document.getElementById('current-player');
const winner = document.getElementById('winner');
const ROW_SIZE = 7;
let currentPlayer = 1;

squares.forEach((square, idx) => square.addEventListener('click', () => manageSquares(idx, squares)));

const assignSquare = (sq, playerTag, player) => {
    sq.classList.add('occupied');
    sq.classList.add(playerTag)
    currentPlayer = player;
    currentPlayerDisplay.innerText = currentPlayer;
}

function manageSquares (idx, squares) {
    if (squares[idx + ROW_SIZE].classList.contains('occupied')) {
        if (currentPlayer === 1) assignSquare(squares[idx], 'player-one', 2);
        else assignSquare(squares[idx], 'player-two', 1);
    } else {

    }
}
