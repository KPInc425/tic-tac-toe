// This is meant to control the flow of the game
const Gameflow = () => {

    let gameState = 0;
    let gameDifficulty = 0;
    let aiOn = 0;

    // player object declared with factory function
    const Player = (name, marker) => {
        let playerTurn = 0;
        let playerMarker = marker;
        const getName = () => name;
        const win = () => {
            console.log(getName() + " Has Won This Round!");
        };
        const makeMove = () => {
            
        };
        return {
            getName,
            win,
            makeMove,
            playerTurn,
            playerMarker,
        };
    }

    playerOne = Player("Jonny", "X");
    

    // let turnCountP1 = 0;
    // let turnCountP2 = 0;
    const Controls = (() => {
        const buttonNewGame = document.querySelector('#newGame');
        buttonNewGame.addEventListener('click', () => {
            console.log("New Game!")
        })

        const buttonVSAI = document.querySelector('#vsAI');
        buttonVSAI.addEventListener('click', () => {
            if (!aiOn) {
                console.log("You Challenged Jarvis!")
                buttonVSAI.textContent = "VS Human";
                playerTwo = Player("Jarvis", "O");
                aiOn = 1;
            } else {
                console.log("You Challenged another Human!")
                buttonVSAI.textContent = "VS AI";
                playerTwo = Player(playerName, marker);
                aiOn = 0;
            }
            
        })

        const buttonChangeDifficulty = document.querySelector('#changeDifficulty');
        buttonChangeDifficulty.addEventListener('click', () => {
            if (gameDifficulty == 0) {
                gameDifficulty = 1;
                console.log("GameDifficulty Changed to " + gameDifficulty);
            } else if (gameDifficulty == 1) {
                gameDifficulty = 2;
                console.log("GameDifficulty Changed to " + gameDifficulty);
            } else {
                gameDifficulty = 0;
                console.log("GameDifficulty Changed to " + gameDifficulty);
            }
        })
    })();
    
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
                            //alert("GameState: " + gameState);
                            playerOne.playerTurn++;
                            console.log("Player1 Turn# " + playerOne.playerTurn);
                            checkGameBoard();
    
    
                        }
                    } else if (gameState == 2){
                        if (div.textContent == "") {
                            div.textContent = "O";
                            // CAN MAKE ALL OF THE INPUTS 1 AND THEN CHECK WHO HAS MOST TURNS TO DETERMINE WINNER.
                            gameBoardArray[index] = 2;
                            
                            gameState = 1;
                            //alert("GameState: " + gameState);
                            playerTwo.playerTurn++;
                            console.log("Player2 Turn# " + playerTwo.playerTurn);
                            checkGameBoard();
                        }
                    }
                    //div.textContent = "Clicked!" + index;
                })
            })
        })();
    
    
        const checkGameBoard = () => {
            if (gameBoardArray[0] == 1 && gameBoardArray[1] == 1 && gameBoardArray[2] == 1) {
                playerOne.win();
                winScenario();
            } else if (gameBoardArray[3] == 1 && gameBoardArray[4] == 1 && gameBoardArray[5] == 1) {
                playerOne.win();
                winScenario();
            } else if (gameBoardArray[6] == 1 && gameBoardArray[7] == 1 && gameBoardArray[8] == 1) {
                playerOne.win();
                winScenario();
            } else if (gameBoardArray[0] == 1 && gameBoardArray[3] == 1 && gameBoardArray[6] == 1) {
                playerOne.win();
                winScenario();
            } else if (gameBoardArray[1] == 1 && gameBoardArray[4] == 1 && gameBoardArray[7] == 1) {
                playerOne.win();
                winScenario();
            } else if (gameBoardArray[2] == 1 && gameBoardArray[5] == 1 && gameBoardArray[8] == 1) {
                playerOne.win();
                winScenario();
            } else if (gameBoardArray[0] == 1 && gameBoardArray[4] == 1 && gameBoardArray[8] == 1) {
                playerOne.win();
                winScenario();
            } else if (gameBoardArray[2] == 1 && gameBoardArray[4] == 1 && gameBoardArray[5] == 1) {
                playerOne.win();
                winScenario();
            } else if (gameBoardArray[0] == 2 && gameBoardArray[1] == 2 && gameBoardArray[2] == 2) {
                playerTwo.win();
                winScenario();
            } else if (gameBoardArray[3] == 2 && gameBoardArray[4] == 2 && gameBoardArray[5] == 2) {
                playerTwo.win();
                winScenario();
            } else if (gameBoardArray[6] == 2 && gameBoardArray[7] == 2 && gameBoardArray[8] == 2) {
                playerTwo.win();
                winScenario();
            } else if (gameBoardArray[0] == 2 && gameBoardArray[3] == 2 && gameBoardArray[6] == 2) {
                playerTwo.win();
                winScenario();
            } else if (gameBoardArray[1] == 2 && gameBoardArray[4] == 2 && gameBoardArray[7] == 2) {
                playerTwo.win();
                winScenario();
            } else if (gameBoardArray[2] == 2 && gameBoardArray[5] == 2 && gameBoardArray[8] == 2) {
                playerTwo.win();
                winScenario();
            } else if (gameBoardArray[0] == 2 && gameBoardArray[4] == 2 && gameBoardArray[8] == 2) {
                playerTwo.win();
                winScenario();
            } else if (gameBoardArray[2] == 2 && gameBoardArray[4] == 2 && gameBoardArray[5] == 2) {
                playerTwo.win();
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
            //alert("WINNER");
            // Need a button to start the game, will turn gamestate to something other than 0
            gameState = 0;
            playerOne.playerTurn = 0;
            playerTwo.playerTurn = 0;
            gameBoardArray = [];
            // Create this function
            refreshGameBoard();
        }
    
        return {
            gameBoardArray,
            checkGameBoard,
            winningCombos,
            // displayGameBoard, 
            // tl,tm,tr,
            // ml,mm,mr,
            // bl,bm,br,
        };
    })();

}

Gameflow();

const AddButtonEventListeners = (item,idOrClass,action) => {
    item = document.querySelector(idOrClass);
    item.addEventListener('click', () => {
        action;
    })
}