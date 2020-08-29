const squares = document.querySelectorAll('.board div');
const currentPlayerDisplay = document.getElementById('current-player');
const winnerDisplay = document.getElementById('winner');
const modal = document.getElementById('modal');
const gameOverModal = document.getElementById('game-over-modal');
const playAgain = document.getElementById('play-again');
const ROW_SIZE = 7;

let gameOptions = {
    currentPlayer: 1,
    winner: '',
    gameOver: false
}

let matrix = Array(42).fill(0);

if (!gameOptions.gameOver) squares.forEach((square, idx) => square.addEventListener('click', () => manageSquares(idx, squares)));

const assignSquare = (sq, idx, playerTag, player, nextPlayer) => {
    sq.classList.add('occupied');
    sq.classList.add(playerTag);
    gameOptions.currentPlayer = nextPlayer;
    matrix[idx] = player;
    currentPlayerDisplay.innerText = nextPlayer;
}

function manageSquares (idx, squares) {
    if (squares[idx].classList.contains('occupied')) return;
    if (squares[idx + ROW_SIZE].classList.contains('occupied')) {
        if (gameOptions.currentPlayer === 1) assignSquare(squares[idx], idx, 'player-one', 1, 2);
        else assignSquare(squares[idx], idx, 'player-two', 2, 1);
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
   console.log('1',player1Arr, '2', player2Arr);
   if (player1Arr.length >= 4 || player2Arr.length >= 4) {
       winningSequences.forEach(sequence => {
           if (sequence.includes(player1Arr[0]) && sequence.includes(player1Arr[1]) && sequence.includes(player1Arr[2]) && sequence.includes(player1Arr[3])) gameOptions.winner = 'PLAYER 1';
           if (sequence.includes(player2Arr[0]) && sequence.includes(player2Arr[1]) && sequence.includes(player2Arr[2]) && sequence.includes(player2Arr[3])) gameOptions.winner = 'PLAYER 2';
       });
   }
   if (gameOptions.winner) {
       gameOptions.gameOver = true;
       winnerDisplay.innerText = gameOptions.winner;
       gameOverModal.classList.remove('hidden');
   }
}

const filterIdx = (arr, player) => {
    matrix.filter((val, idx) => {
        if (val === player) arr.push(idx);
    });
    return arr;
}

playAgain.addEventListener('click', () => location.reload())

