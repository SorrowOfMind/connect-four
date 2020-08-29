const squares = document.querySelectorAll('.board div');
const currentPlayerDisplay = document.getElementById('current-player');
const winnerDisplay = document.getElementById('winner');
const modal = document.getElementById('modal');
const ROW_SIZE = 7;
let currentPlayer = 1;
let winner = '';

let matrix = Array(42).fill(0);

squares.forEach((square, idx) => square.addEventListener('click', () => manageSquares(idx, squares)));

const assignSquare = (sq, idx, playerTag, player) => {
    sq.classList.add('occupied');
    sq.classList.add(playerTag);
    currentPlayer = player;
    matrix[idx] = currentPlayer;
    currentPlayerDisplay.innerText = currentPlayer;
    console.log(matrix);
}

function manageSquares (idx, squares) {
    if (squares[idx].classList.contains('occupied')) return;
    if (squares[idx + ROW_SIZE].classList.contains('occupied')) {
        if (currentPlayer === 1) assignSquare(squares[idx], idx, 'player-one', 2);
        else assignSquare(squares[idx], idx, 'player-two', 1);
    } else {
        modal.style.top = '0';
        setTimeout(() => {
            modal.style.top = '-100%';
        }, 1000);
    };
    checkIfWinner()
}

const checkIfWinner = () => {
    let player1Arr = filterIdx([], 1);
    let player2Arr = filterIdx([], 2);
   console.log(player1Arr, player2Arr);
   if (player1Arr.length >= 4 || player2Arr.length >= 4) {
       winningSequences.forEach(sequence => {
           if (sequence.includes((player1Arr[0] && player1Arr[1] && player1Arr[2] && player1Arr[3]))) winner = 'PLAYER 1';
           if (sequence.includes((player2Arr[0] && player2Arr[1] && player2Arr[2] && player2Arr[3]))) winner = 'PLAYER 2';
       });
   }
   console.log(winner)
   if (winner) {
       winnerDisplay.innerText = winner;
   }
}

const filterIdx = (arr, player) => {
    matrix.filter((val, idx) => {
        if (val === player) arr.push(idx);
    });
    return arr;
}

