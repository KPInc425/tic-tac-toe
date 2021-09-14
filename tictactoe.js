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
            Gameboard.gameBoardArray = [0,0,0,
                                        0,0,0,
                                        0,0,0];
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
        
    
        // This could be better represented as 3 objects in an array gameBoardArray = [{_,_,_},{_,_,_},{_,_,_}]
        // I think I was having trouble comparing the objects...
        var gameBoardArray = [0,0,0,
                              0,0,0,
                              0,0,0];
    
    
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
                                checkGameBoard(playerOne, 1);
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
                                checkGameBoard(playerTwo, 2);
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
                                let boardValue = checkGameBoard(playerOne, 1);
                                //console.log("AI: The value of this board is " + boardValue);
                            }
                        } 
                        if (gameState == 2) {
                            index = makeMoveAI(gameBoardArray);
                            
                            //console.log(`index: ${index}`);
                            
                            returnObj = isMovesLeft(index);

                            index = returnObj.index;
                            //console.log("#2 " + returnObj.index);
                            let markedGameSlot = returnObj.markedGameSlot;

                            if (markedGameSlot.textContent == "") {
                                //console.log("Marking Slot!")
                                markedGameSlot.textContent = playerAI.playerMarker;
                            }
                            gameBoardArray[index] = 2;
                            gameState = 1;
                            playerAI.playerTurn++;
                            console.log("PlayerAI Turn# " + playerAI.playerTurn);
                            let boardValue = checkGameBoard(playerAI, 2);
                            //console.log("AI: The value of this board is " + boardValue);
                        }
                    }
                    if (gameState == 0) {
                        gameBoardArray = [0,0,0,
                                          0,0,0,
                                          0,0,0];
                    }
                })
            })
        })();


        // // This could likely be combined to evaluate winner as well (CHANGE NAME TO evaluateBoard)
        // const evaluateAINextMove = (player, marker) => {
        //     // Rows
        //     if (gameBoardArray[0] == marker && gameBoardArray[1] == marker && gameBoardArray[2] == marker) {
               
        //         if (player == playerOne) {
        //             return 10;
        //         } else {
        //             return -10;
        //         }   
        //     } else if (gameBoardArray[3] == marker && gameBoardArray[4] == marker && gameBoardArray[5] == marker) {
               
        //         if (player == playerOne) {
        //             return 10;
        //         } else {
        //             return -10;
        //         }   
        //     } else if (gameBoardArray[6] == marker && gameBoardArray[7] == marker && gameBoardArray[8] == marker) {
               
        //         if (player == playerOne) {
        //             return 10;
        //         } else {
        //             return -10;
        //         }   
        //     // Columns
        //     } else if (gameBoardArray[0] == marker && gameBoardArray[3] == marker && gameBoardArray[6] == marker) {
               
        //         if (player == playerOne) {
        //             return 10;
        //         } else {
        //             return -10;
        //         }   
        //     } else if (gameBoardArray[1] == marker && gameBoardArray[4] == marker && gameBoardArray[7] == marker) {
               
        //         if (player == playerOne) {
        //             return 10;
        //         } else {
        //             return -10;
        //         }   
        //     } else if (gameBoardArray[2] == marker && gameBoardArray[5] == marker && gameBoardArray[8] == marker) {
               
        //         if (player == playerOne) {
        //             return 10;
        //         } else {
        //             return -10;
        //         }   
        //     // Diaganol
        //     } else if (gameBoardArray[0] == marker && gameBoardArray[4] == marker && gameBoardArray[8] == marker) {
               
        //         if (player == playerOne) {
        //             return 10;
        //         } else {
        //             return -10;
        //         }   
        //     } else if (gameBoardArray[2] == marker && gameBoardArray[4] == marker && gameBoardArray[6] == marker) {
               
        //         if (player == playerOne) {
        //             return 10;
        //         } else {
        //             return -10;
        //         }   
        //     } else if (playerOne.playerTurn == 5) {

        //         return 0;
        //     }
        //     return 0;
    
        // };

        // function minimax(board, depth, isMax) {
        //     let score = evaluateAINextMove(playerAI, board);

        //     if (score == 10) {
        //         return score;
        //     }

        //     if (score == -10) {
        //         return score;
        //     }

        //     if (isMovesLeft(0) == false) {
        //         return 0;
        //     }

        //     if(isMax) {
        //         let best = -1000;

        //         board.forEach((slot) => {
        //             if (slot == 0) {
        //                 // make Maximizer Move
        //                 slot.value = 1;

        //                 best = Math.max(best, minimax(board, depth + 1, !isMax))

        //                 slot.value = 0;
        //             }
        //         })
        //         return best;
        //     } else {
        //         let best = 1000;

        //         board.forEach((slot) => {
        //             if (slot.value == 0) {
        //                 slot.value = 2;

        //                 best = Math.min(best, minimax(board, depth + 1, !isMax));

        //                 slot.value = 0;
        //             } 
        //         })
        //         return best;
        //     }

        // }
        // // BEST AI?
        // function findBestMove(board) {
        //     let bestVal = -1000;
        //     let bestMove = -1;
        //     let i = 0;
        //     board.forEach((slot) => {
        //         if (slot == 0) {
        //             slot = 1;

        //             let moveVal = minimax(board, 0, false);
                    
        //             if (moveVal > bestVal) {
        //                 bestMove = slot[i];
        //             }

        //             slot = 0; 
        //             i++;
        //         }
        //     })
        //     console.log("The value of the best move is " + bestVal);

        //     return bestMove;
        // } 

    
        // This can DEF be rebuilt better

        const isMovesLeft = (index) => {
            let markedGameSlot = document.querySelector(`.gameSlot[data-pos="${index}"]`);
            
            while (!(markedGameSlot.textContent == "")) {
                index = makeMoveAI();
                console.log(`index: ${index}`);
                //returnObj = isMovesLeft(index);
                markedGameSlot = document.querySelector(`.gameSlot[data-pos="${index}"]`);
                console.log("PlayerAI turn# " + playerAI.playerTurn);
                if (playerAI.playerTurn == 4) {
                    return false;
                }
            }

            return {
                index, 
                markedGameSlot
            };     
        }

        const checkGameBoard = (player, marker) => {
            // Rows
            if (gameBoardArray[0] == marker && gameBoardArray[1] == marker && gameBoardArray[2] == marker) {
                playerWinAlert(player);
                if (player == playerOne) {
                    return 10;
                } else {
                    return -10;
                }   
            } else if (gameBoardArray[3] == marker && gameBoardArray[4] == marker && gameBoardArray[5] == marker) {
                playerWinAlert(player);
                if (player == playerOne) {
                    return 10;
                } else {
                    return -10;
                }   
            } else if (gameBoardArray[6] == marker && gameBoardArray[7] == marker && gameBoardArray[8] == marker) {
                playerWinAlert(player);
                if (player == playerOne) {
                    return 10;
                } else {
                    return -10;
                }   
            // Columns
            } else if (gameBoardArray[0] == marker && gameBoardArray[3] == marker && gameBoardArray[6] == marker) {
                playerWinAlert(player);
                if (player == playerOne) {
                    return 10;
                } else {
                    return -10;
                }   
            } else if (gameBoardArray[1] == marker && gameBoardArray[4] == marker && gameBoardArray[7] == marker) {
                playerWinAlert(player);
                if (player == playerOne) {
                    return 10;
                } else {
                    return -10;
                }   
            } else if (gameBoardArray[2] == marker && gameBoardArray[5] == marker && gameBoardArray[8] == marker) {
                playerWinAlert(player);
                if (player == playerOne) {
                    return 10;
                } else {
                    return -10;
                }   
            // Diaganol
            } else if (gameBoardArray[0] == marker && gameBoardArray[4] == marker && gameBoardArray[8] == marker) {
                playerWinAlert(player);
                if (player == playerOne) {
                    return 10;
                } else {
                    return -10;
                }   
            } else if (gameBoardArray[2] == marker && gameBoardArray[4] == marker && gameBoardArray[6] == marker) {
                playerWinAlert(player);
                if (player == playerOne) {
                    return 10;
                } else {
                    return -10;
                }   
            } else if (playerOne.playerTurn == 5) {
                console.log("Game was a Tie!")
                gameState = 0;
                return 0;
            }
            return 0;
    
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
            console.log(gameBoardArray);
            // Create this function
            // refreshGameBoard();
        }
    
        return {
            gameBoardArray,
            checkGameBoard,
            isMovesLeft,
            // winningCombos,
            refreshGameBoard,
            // displayGameBoard, 
            // tl,tm,tr,
            // ml,mm,mr,
            // bl,bm,br,
        };
    })();

    const makeMoveAI = (gameBoard) => {

        const evaluateAINextMove = () => {
            // Rows
            if (Gameboard.gameBoardArray[0] == 1 && Gameboard.gameBoardArray[1] == 1 && Gameboard.gameBoardArray[2] == 1) {
                return 10;
            } else if (Gameboard.gameBoardArray[3] == 1 && Gameboard.gameBoardArray[4] == 1 && Gameboard.gameBoardArray[5] == 1) {
                return 10;
            } else if (Gameboard.gameBoardArray[6] == 1 && Gameboard.gameBoardArray[7] == 1 && Gameboard.gameBoardArray[8] == 1) {
                return 10;
            // Columns
            } else if (Gameboard.gameBoardArray[0] == 1 && Gameboard.gameBoardArray[3] == 1 && Gameboard.gameBoardArray[6] == 1) {
                return 10;
            } else if (Gameboard.gameBoardArray[1] == 1 && Gameboard.gameBoardArray[4] == 1 && Gameboard.gameBoardArray[7] == 1) {
                return 10;
            } else if (Gameboard.gameBoardArray[2] == 1 && Gameboard.gameBoardArray[5] == 1 && Gameboard.gameBoardArray[8] == 1) {
                return 10;
            // Diaganol 
            } else if (Gameboard.gameBoardArray[0] == 1 && Gameboard.gameBoardArray[4] == 1 && Gameboard.gameBoardArray[8] == 1) {
                return 10;
            } else if (Gameboard.gameBoardArray[2] == 1 && Gameboard.gameBoardArray[4] == 1 && Gameboard.gameBoardArray[6] == 1) {
                return 10;
            // Rows
            } else if (Gameboard.gameBoardArray[0] == 2 && Gameboard.gameBoardArray[1] == 2 && Gameboard.gameBoardArray[2] == 2) {
                return -10;
            } else if (Gameboard.gameBoardArray[3] == 2 && Gameboard.gameBoardArray[4] == 2 && Gameboard.gameBoardArray[5] == 2) {
                return -10;
            } else if (Gameboard.gameBoardArray[6] == 2 && Gameboard.gameBoardArray[7] == 2 && Gameboard.gameBoardArray[8] == 2) {
                return -10;
            // Columns
            } else if (Gameboard.gameBoardArray[0] == 2 && Gameboard.gameBoardArray[3] == 2 && Gameboard.gameBoardArray[6] == 2) {
                return -10;
            } else if (Gameboard.gameBoardArray[1] == 2 && Gameboard.gameBoardArray[4] == 2 && Gameboard.gameBoardArray[7] == 2) {
                return -10;
            } else if (Gameboard.gameBoardArray[2] == 2 && Gameboard.gameBoardArray[5] == 2 && Gameboard.gameBoardArray[8] == 2) {
                return -10;
            // Diaganol 
            } else if (Gameboard.gameBoardArray[0] == 2 && Gameboard.gameBoardArray[4] == 2 && Gameboard.gameBoardArray[8] == 2) {
                return -10;
            } else if (Gameboard.gameBoardArray[2] == 2 && Gameboard.gameBoardArray[4] == 2 && Gameboard.gameBoardArray[6] == 2) {
                return -10;
            } else if (playerOne.playerTurn == 5) {
                return 0;
            }
            return 0;
    
        };

        if (gameDifficulty == 0) {
            const index = getRdmInt(0, 8);
            return index;
        }

        if (gameDifficulty == 1) {
            console.log("Game Difficulty 2 WIP");
            const index = findBestMove(gameBoard);
            console.log("findBestMoveIndex" + index);
            return index;
        }

        if (gameDifficulty == 2) {
            console.log("Game Difficulty 3 WIP");
            const index = getRdmInt(0, 8);
            return index;
        }

        // This could likely be combined to evaluate winner as well (CHANGE NAME TO evaluateBoard)


        function minimax(board, depth, isMax) {
            let score = evaluateAINextMove();

            if (score == 10) {
                return score;
            }

            if (score == -10) {
                return score;
            }

            if (Gameboard.isMovesLeft == false) {
                return 0;
            }

            if(isMax) {
                let best = -1000;

                board.forEach((slot) => {
                    if (slot == 0) {
                        // make Maximizer Move
                        slot.value = 1;

                        best = Math.max(best, minimax(board, depth + 1, !isMax))

                        slot.value = 0;
                    }
                })
                return best;
            } else {
                let best = 1000;

                board.forEach((slot) => {
                    if (slot.value == 0) {
                        slot.value = 2;

                        best = Math.min(best, minimax(board, depth + 1, !isMax));

                        slot.value = 0;
                    } 
                })
                return best;
            }

        }
        // BEST AI? KEEPS RETURNING HIGHEST INDEX with no regard for the board
        function findBestMove(board) {
            let bestVal = -1000;
            let bestMove = -1;
            let i = 0;
            board.forEach((slot) => {
                if (slot == 0) {
                    slot = 1;

                    let moveVal = minimax(board, 0, false);
                    
                    if (moveVal > bestVal) {
                        bestMove = i;
                        console.log("bestMove = " + bestMove);
                    }

                    slot = 0; 
                    i++;
                    
                } else {
                    i++
                }
            });
            console.log("The value of the best move is " + bestVal);

            return bestMove;
        } 
    }

    function getRdmInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return {
        Gameboard,
    }


}

Gameflow();

const AddButtonEventListeners = (item,idOrClass,action) => {
    item = document.querySelector(idOrClass);
    item.addEventListener('click', () => {
        action;
    })
}