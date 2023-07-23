// Selecting Elements from HTML

const gameContainer = document.querySelector('.game-board-container')
const restartButton = document.querySelector('.restart')


// game IIFE

const gameBoard = (() => {
    
    // player objects

    let player1 = {
        name: 'playerOne',
        choice : 'X'
    }

    let player2 = {
        name: 'playerTwo',
        choice : 'O'
    }


    // board array

    board = ['', '', '', '', '', '','','','']
    let turn = true


    // event handler


    const eventHandler = (e) => {
        
        for (let i = 0; i < board.length; i++){
            if (turn){
                addMark(e)
                turn = false;
            }
            else {
                nextMark(e)
                turn = true;
            }
        } 

        if (gameLoop()){
            winnerDiv()
            
        }
    }
    
    

    // generates 3X3 board


    const generateBoard = () => {
        for (let i = 0; i < 9; i++){
            const buttons = document.createElement('button');
            buttons.classList.add('cells')
            buttons.id = i;
            buttons.textContent = board[i]
            buttons.addEventListener('click', eventHandler)
            restartButton.addEventListener('click', restartGame)
            gameContainer.appendChild(buttons)

        }
    }


    // player1 mark

    const addMark = (e) => {
        e.target.textContent = player1.choice
        let index = e.target.getAttribute('id')
        board.splice(index, 1, 'X')

        
    }

    // player 2 mark

    const nextMark = (e) => {
        e.target.textContent = player2.choice
        let index = e.target.getAttribute('id')
        board.splice(index, 1, 'O')

    }


    // winner display


    const winnerDiv = (winner) => {
        const winnerDisplay = document.createElement('div')
        winnerDisplay.classList.add('winner')
        winnerDisplay.textContent = `${winner} Won The Game :}`
        if (winner === 'Draw'){
            winnerDisplay.textContent = `${winner}/Tie Game :}`
        }
        gameContainer.appendChild(winnerDisplay)
    }
    

    // draw game logic

    const drawGame = () => {
        for (let i = 0; i < board.length; i++){
            if (board.every(choice => choice !== ''))
            winnerDiv('Draw')
        }
    }


    // checking winner

    const gameLoop = () => {

        /*
        0 | 1 | 2
        3 | 4 | 5
        6 | 7 | 8
        */

        if (board[0] === board[1] && board[0] === board[2] && board[0] !== ''){
            winnerDiv(board[1])          
        }
        else if (board[3] === board[4] && board[3] === board[5] && board[3] !== ''){
            winnerDiv(board[4])
        }
        else if (board[6] === board[7] && board[6] === board[8] && board[6] !== ''){
            winnerDiv(board[7])
        }
        else if (board[0] === board[3] && board[0] === board[6] && board[0] !== ''){
            winnerDiv(board[3])
        }
        else if (board[1] === board[4] && board[1] === board[7] && board[1] !== ''){
            winnerDiv(board[4])
        }
        else if (board[2] === board[5] && board[2] === board[8] && board[2] !== ''){
            winnerDiv(board[5])
        }
        else if (board[0] === board[4] && board[0] === board[8] && board[0] !== ''){
            winnerDiv(board[4])
        }
        else if (board[2] === board[4] && board[2] === board[6] && board[2] !== ''){
            winnerDiv(board[4])
        }

        else{
            drawGame()
        }
    }


    // restart 

    
    const restartGame = () => {
        board = ['', '', '', '', '', '','','','']
        turn = true
        window.location.reload()

    }

    // invoke

    generateBoard();

})();
