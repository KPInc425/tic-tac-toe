// game board object declared with module
// TESTING 
gameState = 0;
turnCountP1 = 0;
turnCountP2 = 0;


const Gameboard = (() => {
    const x = 1;
    const o = 2;
    const gameBoard = document.querySelectorAll(".gameSlot");

    if (gameState == 0) {
        var tl = 0;
        var tm = 0;
        var tr = 0;
        var ml = 0;
        var mm = 0;
        var mr = 0;
        var bl = 0;
        var bm = 0;
        var br = 0;
        gameState = 1;
        console.log(gameState);
    }

    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    


    let gameBoardArray = [tl,tm,tr,
                       ml,mm,mr,
                       bl,bm,br];


    // ADD THIS TO PLAYERS?
    const addClickListeners = (() => {
        gameBoard.forEach((div) => {
            div.addEventListener('click', () => {
                let index = div.getAttribute('data-pos');
                //alert("Clicked " + index);
                if (gameState == 1) {
                    if (div.textContent == "") {
                        div.textContent = "X";
                        gameBoardArray[index] = 1;
                        
                        gameState = 2;
                        turnCountP1++;
                        console.log("Player1 Turn# " + turnCountP1);
                        checkGameBoard();


                    }
                } else if (gameState == 2){
                    if (div.textContent == "") {
                        div.textContent = "O";
                        // CAN MAKE ALL OF THE INPUTS 1 AND THEN CHECK WHO HAS MOST TURNS TO DETERMINE WINNER.
                        gameBoardArray[index] = 2;
                        
                        gameState = 1;
                        turnCountP2++;
                        console.log("Player2 Turn# " + turnCountP2);
                        checkGameBoard();
                    }
                }
                //div.textContent = "Clicked!" + index;
            })
        })
    })();


    const checkGameBoard = () => {
        if (gameBoardArray[0] == 1 && gameBoardArray[1] == 1 && gameBoardArray[2] == 1) {
            winScenario();
        } else if (gameBoardArray[3] == 1 && gameBoardArray[4] == 1 && gameBoardArray[5] == 1) {
            winScenario();
        } else if (gameBoardArray[6] == 1 && gameBoardArray[7] == 1 && gameBoardArray[8] == 1) {
            winScenario();
        } else if (gameBoardArray[0] == 1 && gameBoardArray[3] == 1 && gameBoardArray[6] == 1) {
            winScenario();
        } else if (gameBoardArray[1] == 1 && gameBoardArray[4] == 1 && gameBoardArray[7] == 1) {
            winScenario();
        } else if (gameBoardArray[2] == 1 && gameBoardArray[5] == 1 && gameBoardArray[8] == 1) {
            winScenario();
        } else if (gameBoardArray[0] == 1 && gameBoardArray[4] == 1 && gameBoardArray[8] == 1) {
            winScenario();
        } else if (gameBoardArray[2] == 1 && gameBoardArray[4] == 1 && gameBoardArray[5] == 1) {
            winScenario();
        }

    };

    const refreshGameBoard = () => {
        gameBoard.forEach((div) => {
            div.textContent = "";
        })
        gameState = 1;
    }

    function winScenario() {
        alert("WINNER");
        // Need a button to start the game, will turn gamestate to something other than 0
        gameState = 0;
        turnCountP1 = 0;
        turnCountP2 = 0;
        gameBoardArray = [];
        // Create this function
        refreshGameBoard();
    }

    return {
        gameBoardArray,
        checkGameBoard,
        // displayGameBoard, 
        // tl,tm,tr,
        // ml,mm,mr,
        // bl,bm,br,
    };
})();



// player object declared with factory function
const Player = (name) => {
    const getName = () => name;
    const win = () => {

    };
    const makeMove = () => {
        
    };
    return {
        getName,
        win,
        makeMove,
    };
}

// Gameflow object declared with module 
// This is meant to control the flow of the game
const Gameflow = (() => {
    //gameState = 0;
    
})

