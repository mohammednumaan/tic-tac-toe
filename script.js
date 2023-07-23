const gameContainer = document.querySelector('.game-board-container')

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
            else{
                nextMark(e)
                turn = true;
            }
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

    // invoke
    
    generateBoard();

})();
