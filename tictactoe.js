// This is meant to control the flow of the game
const Gameflow = () => {

    let gameState = 0;
    let gameDifficulty = 0;
    let aiOn = 0;

    // player object declared with factory function
    const Player = (name, marker) => {
        let playerTurn = 0;
        let playerMarker = marker;
        let playerStats = 0;
        const getName = () => name;
        const win = () => {
            console.log(name + " Has Won This Round!");
        };
        const makeMove = () => {
            
        };
        return {
            getName,
            win,
            makeMove,
            playerTurn,
            playerMarker,
            playerStats,
        };
    }

    // TESTING
    let playerOne = Player("Player 1", "X");
    let playerTwo = Player("Player 2", "O");
    // ADD ABILITY TO EDIT AI NAME AND MARKER
    let playerAI = Player("Jarvis", "O");

    const dynamicHUD = () => {
        const playerOneName = document.querySelector('#playerOneName');
        const playerOneStats = document.querySelector('#playerOneStats');
        const playerOneMarker = document.querySelector('#playerOneMarker');
        playerOneName.textContent = playerOne.getName();
        playerOneStats.textContent = playerOne.playerStats;
        playerOneMarker.textContent = playerOne.playerMarker;

        if (!aiOn) {
            const playerTwoName = document.querySelector('#playerTwoName');
            const playerTwoStats = document.querySelector('#playerTwoStats');
            const playerTwoMarker = document.querySelector('#playerTwoMarker');
            playerTwoName.textContent = playerTwo.getName();
            playerTwoStats.textContent = playerTwo.playerStats;
            playerTwoMarker.textContent = playerTwo.playerMarker;
        } else {
            const playerTwoName = document.querySelector('#playerTwoName');
            const playerTwoStats = document.querySelector('#playerTwoStats');
            const playerTwoMarker = document.querySelector('#playerTwoMarker');
            playerTwoName.textContent = playerAI.getName();
            playerTwoStats.textContent = playerAI.playerStats;
            playerTwoMarker.textContent = playerAI.playerMarker;
        }
    };    

    dynamicHUD();

    // let turnCountP1 = 0;
    // let turnCountP2 = 0;
    const Controls = (() => {
        const buttonNewGame = document.querySelector('#newGame');
        buttonNewGame.addEventListener('click', () => {
            console.log("New Game!")
            Gameboard.refreshGameBoard();
        })

        const buttonVSAI = document.querySelector('#vsAI');
        buttonVSAI.addEventListener('click', () => {
            if (!aiOn) {
                console.log("You Challenged Jarvis!")
                buttonVSAI.textContent = "VS Human";
                // playerAI = Player("Jarvis", "O");
                aiOn = 1;
                dynamicHUD();
            } else {
                console.log("You Challenged another Human!")
                buttonVSAI.textContent = "VS AI";
                aiOn = 0;
                dynamicHUD();
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
        // Get new player button divs
        const newPlayerButtonArray = document.querySelectorAll(".buttonPlayerForm");
        newPlayerButtonArray.forEach((div) => {
            div.addEventListener('click', () => {
                // get index of button for proper allocation
                let index = div.getAttribute('data-id');
                alert("Testing! " + index);
                const showPlayerForm = (() => {
                    const newPlayerForm = document.querySelector('#formContainer');
                    newPlayerForm.style.display = "block";
                    const buttonAddNewPlayerButton = document.querySelector('#buttonAddNewPlayer');
                    const playerName = document.querySelector('#playerName');
                    const playerMarker = document.querySelector('#playerMarker');
                    buttonAddNewPlayerButton.addEventListener('click', () => {
                        // create players
                        if (playerName.value == "") {
                            alert("Please input player name!")
                        } else if (playerMarker.length > 1 || playerMarker.value == "") {
                            alert("Please input a Player Marker (ONLY 1 Char)");
                        } else {
                            if (index == 1) {
                                alert("Index 1: " + index);
                                playerOne = Player(playerName.value, playerMarker.value);
                                // alert(playerName.value);
                                playerName.value = "";
                                playerMarker.value = "";
                                newPlayerForm.style.display = "none";
                                index = 0;
                                dynamicHUD();
                            } 
                            if (index == 2) {
                                alert("Index 2: " + index);
                                playerTwo = Player(playerName.value, playerMarker.value);
                                playerName.value = "";
                                playerMarker.value = "";
                                newPlayerForm.style.display = "none";
                                //This was duplicating for some reason
                                index = 0;
                                dynamicHUD();
                            }
                        }
                        
                    })
                })();
            })
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
    
        // const winningCombos = [
        //     [0,1,2],
        //     [3,4,5],
        //     [6,7,8],
        //     [0,3,6],
        //     [1,4,7],
        //     [2,5,8],
        //     [0,4,8],
        //     [2,4,6],
        // ]
        
    
    
        let gameBoardArray = [tl,tm,tr,
                           ml,mm,mr,
                           bl,bm,br];
    
    
        // ADD THIS TO PLAYERS?
        const addClickListeners = (() => {
            gameBoard.forEach((div) => {
                div.addEventListener('click', () => {
                    let index = div.getAttribute('data-pos');
                    //alert("Clicked " + index);
                    if (!aiOn) {
                        if (gameState == 1) {
                            if (div.textContent == "") {
                                div.textContent = playerOne.playerMarker;
                                gameBoardArray[index] = 1;
                                gameState = 2;
                                //alert("GameState: " + gameState);
                                playerOne.playerTurn++;
                                console.log("Player1 Turn# " + playerOne.playerTurn);
                                checkGameBoard();
                            }
                        } else if (gameState == 2){
                            if (div.textContent == "") {
                                div.textContent = playerTwo.playerMarker;
                                // CAN MAKE ALL OF THE INPUTS 1 AND THEN CHECK WHO HAS MOST TURNS TO DETERMINE WINNER.
                                gameBoardArray[index] = 2;
                                gameState = 1;
                                //alert("GameState: " + gameState);
                                playerTwo.playerTurn++;
                                console.log("Player2 Turn# " + playerTwo.playerTurn);
                                checkGameBoard();
                            }
                        }
                    } else {
                        if (gameState == 1) {
                            if (div.textContent == "") {
                                div.textContent = playerOne.playerMarker;
                                gameBoardArray[index] = 1;
                                gameState = 2;
                                //alert("GameState: " + gameState);
                                playerOne.playerTurn++;
                                console.log("Player1 Turn# " + playerOne.playerTurn);
                                checkGameBoard();
                            }
                        } 
                        if (gameState == 2) {
                            index = makeMoveAI();
                            console.log(`index: ${index}`);
                            let markedGameSlot = document.querySelector(`.gameSlot[data-pos="${index}"]`);
                            while (!(markedGameSlot.textContent == "")) {
                                index = makeMoveAI();
                                console.log(`index: ${index}`);
                                markedGameSlot = document.querySelector(`.gameSlot[data-pos="${index}"]`);
                                console.log("PlayerAI turn# " + playerAI.playerTurn);
                                if (playerAI.playerTurn == 4) {
                                    break;
                                }
                            } 

                            if (markedGameSlot.textContent == "") {
                                console.log("Marking Slot!")
                                markedGameSlot.textContent = playerAI.playerMarker;
                            }
                            gameBoardArray[index] = 2;
                            gameState = 1;
                            playerAI.playerTurn++;
                            console.log("Player2 Turn# " + playerAI.playerTurn);
                            checkGameBoard();
                        }
                    }
                })
            })
        })();
    
        // This can DEF be rebuilt better
        const checkGameBoard = () => {
            if (gameBoardArray[0] == 1 && gameBoardArray[1] == 1 && gameBoardArray[2] == 1) {
                playerWinAlert(playerOne);                
            } else if (gameBoardArray[3] == 1 && gameBoardArray[4] == 1 && gameBoardArray[5] == 1) {
                playerWinAlert(playerOne);
            } else if (gameBoardArray[6] == 1 && gameBoardArray[7] == 1 && gameBoardArray[8] == 1) {
                playerWinAlert(playerOne);
            } else if (gameBoardArray[0] == 1 && gameBoardArray[3] == 1 && gameBoardArray[6] == 1) {
                playerWinAlert(playerOne);
            } else if (gameBoardArray[1] == 1 && gameBoardArray[4] == 1 && gameBoardArray[7] == 1) {
                playerWinAlert(playerOne);
            } else if (gameBoardArray[2] == 1 && gameBoardArray[5] == 1 && gameBoardArray[8] == 1) {
                playerWinAlert(playerOne);
            } else if (gameBoardArray[0] == 1 && gameBoardArray[4] == 1 && gameBoardArray[8] == 1) {
                playerWinAlert(playerOne);
            } else if (gameBoardArray[2] == 1 && gameBoardArray[4] == 1 && gameBoardArray[6] == 1) {
                playerWinAlert(playerOne);
            } else if (gameBoardArray[0] == 2 && gameBoardArray[1] == 2 && gameBoardArray[2] == 2) {
                playerWinAlert(playerTwo);
            } else if (gameBoardArray[3] == 2 && gameBoardArray[4] == 2 && gameBoardArray[5] == 2) {
                playerWinAlert(playerTwo);
            } else if (gameBoardArray[6] == 2 && gameBoardArray[7] == 2 && gameBoardArray[8] == 2) {
                playerWinAlert(playerTwo);
            } else if (gameBoardArray[0] == 2 && gameBoardArray[3] == 2 && gameBoardArray[6] == 2) {
                playerWinAlert(playerTwo);
            } else if (gameBoardArray[1] == 2 && gameBoardArray[4] == 2 && gameBoardArray[7] == 2) {
                playerWinAlert(playerTwo);
            } else if (gameBoardArray[2] == 2 && gameBoardArray[5] == 2 && gameBoardArray[8] == 2) {
                playerWinAlert(playerTwo);
            } else if (gameBoardArray[0] == 2 && gameBoardArray[4] == 2 && gameBoardArray[8] == 2) {
                playerWinAlert(playerTwo);
            } else if (gameBoardArray[2] == 2 && gameBoardArray[4] == 2 && gameBoardArray[6] == 2) {
                playerWinAlert(playerTwo);
            } else if (playerOne.playerTurn == 5) {
                console.log("Game was a Tie!")
                gameState = 0;
            }
    
        };
    
        const refreshGameBoard = () => {
            resetGameData();
            gameBoard.forEach((div) => {
                div.textContent = "";
            })
            gameState = 1;
        }

        function playerWinAlert(player) {
            
            // WORKAROUND FOR DYNAMICHUD
            if (player === playerTwo) {
                if (!aiOn) {
                    player.win();
                    player.playerStats++;
                } else {
                    playerAI.win();
                    playerAI.playerStats++;
                }
            } else {
                player.win();
                player.playerStats++;
            }
            
            

            gameState = 0;
            dynamicHUD();
        }
    
        function resetGameData() {
            //alert("WINNER");
            // Need a button to start the game, will turn gamestate to something other than 0
            gameState = 0;
            playerOne.playerTurn = 0;
            playerTwo.playerTurn = 0;
            playerAI.playerTurn = 0;
            gameBoardArray = [];
            // Create this function
            // refreshGameBoard();
        }
    
        return {
            gameBoardArray,
            checkGameBoard,
            // winningCombos,
            refreshGameBoard,
            // displayGameBoard, 
            // tl,tm,tr,
            // ml,mm,mr,
            // bl,bm,br,
        };
    })();

    const makeMoveAI = () => {
        if (gameDifficulty == 0) {
            const index = getRdmInt(0, 8);
            return index;
        }

        if (gameDifficulty == 1) {
            console.log("Game Difficulty 2 WIP");
            const index = getRdmInt(0, 8);
            return index;
        }

        if (gameDifficulty == 2) {
            console.log("Game Difficulty 3 WIP");
            const index = getRdmInt(0, 8);
            return index;
        }

        // const index = getRdmInt(0, 8);
        // return index;
    }

    function getRdmInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

}

Gameflow();

const AddButtonEventListeners = (item,idOrClass,action) => {
    item = document.querySelector(idOrClass);
    item.addEventListener('click', () => {
        action;
    })
}