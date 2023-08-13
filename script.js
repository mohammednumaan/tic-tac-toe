// Selecting Elements from HTML

const gameContainer = document.querySelector('.game-board-container')
const restartButton = document.querySelector('.restart')
const currentPlayerDiv = document.querySelector('.current-player')

// custom player name

const playerOne = prompt('What do you want ur name to be dislayed as (P1)? ')
const playerTwo = prompt('What do you want ur name to be dislayed as (P2)? ')


// game IIFE

const gameBoard = (() => {
    
    // player objects

    const playerDetails = (name, choice) => {

        return {name, choice}
    }

    let userOne = playerDetails(playerOne, 'X')
    let userTwo = playerDetails(playerTwo, 'O')


    // check if player name == null

    if (userOne.name == null || userOne.name == '' ){
        userOne.name = 'Player 1'
    }
    if (userTwo.name == null || userTwo.name == ''){
        userTwo.name = 'Player 2'
    }


    // board array

    board = ['', '', '', '', '', '','','','']
    let turn = true


    // event handler


    const eventHandler = (e) => {
        
        for (let i = 0; i < board.length; i++){
            if (e.target.textContent === ''){

                if (turn){
                    addMark(e)
                    currentPlayerDiv.textContent = `${userOne.name}'s Turn!`
                    turn = false;
                    currentPlayerDiv.textContent = `${userTwo.name}'s Turn!`
                    
                }
                else {
                    nextMark(e)
                    currentPlayerDiv.textContent = `${userTwo.name}'s Turn!`
                    turn = true;
                    currentPlayerDiv.textContent = `${userOne.name}'s Turn!`
                }

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
            buttons.textContent = ''
            buttons.addEventListener('click', eventHandler)
            restartButton.addEventListener('click', restartGame)
            gameContainer.appendChild(buttons)


        }


       
    }


    // userOne mark

    const addMark = (e) => {
        e.target.textContent = userOne.choice
        let index = e.target.getAttribute('id')
        board.splice(index, 1, 'X')

        
    }

    // player 2 mark

    const nextMark = (e) => {
        e.target.textContent = userTwo.choice
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

        disableGameButton()
        currentPlayerDiv.textContent = 'Game Over!'
        gameContainer.appendChild(winnerDisplay)
    }
    

    // draw game logic

    const drawGame = () => {
        for (let i = 0; i < board.length; i++){
            if (board.every(choice => choice !== ''))
            winnerDiv('Draw')
  
        }
    }

    const colorWinner = (index1, index2, index3) => {
        let gameCells = gameContainer.childNodes
        gameCells[index1].style.backgroundColor = '#2D2926FF'
        gameCells[index2].style.backgroundColor = '#2D2926FF'
        gameCells[index3].style.backgroundColor = '#2D2926FF'
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
            colorWinner(0, 1, 2)

        }
        else if (board[3] === board[4] && board[3] === board[5] && board[3] !== ''){
            winnerDiv(board[4])
            colorWinner(3, 4, 5)
        }
        else if (board[6] === board[7] && board[6] === board[8] && board[6] !== ''){
            winnerDiv(board[7])
            colorWinner(6, 7, 8)
        }
        else if (board[0] === board[3] && board[0] === board[6] && board[0] !== ''){
            winnerDiv(board[3])
            colorWinner(0, 3, 6)
        }
        else if (board[1] === board[4] && board[1] === board[7] && board[1] !== ''){
            winnerDiv(board[4])
            colorWinner(1, 4, 7)
        }
        else if (board[2] === board[5] && board[2] === board[8] && board[2] !== ''){
            winnerDiv(board[5])
            colorWinner(2, 5, 8)
        }
        else if (board[0] === board[4] && board[0] === board[8] && board[0] !== ''){
            winnerDiv(board[4])
            colorWinner(0, 4, 8)
        }
        else if (board[2] === board[4] && board[2] === board[6] && board[2] !== ''){
            winnerDiv(board[4])
            colorWinner(2, 4, 6)
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

    // disable game buttons 

    const disableGameButton = () => {
        let gameButtons = gameContainer.childNodes
        console.log(gameButtons)
        gameButtons.forEach(button => {
            button.disabled = true;
            button.classList.add('game-over')
        })
    }

    // invoke

    generateBoard();

})();
