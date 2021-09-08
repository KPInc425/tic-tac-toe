// game board object declared with module
const Gameboard = (() => {
    const x = 1;
    const o = 2;

    let tl = [{slot: 0, state: 0,}];
    let tm = [{slot: 1, state: 0,}];
    let tr = [{slot: 2, state: 0,}];
    let ml = [{slot: 3, state: 0,}];
    let mm = [{slot: 4, state: 0,}];
    let mr = [{slot: 5, state: 0,}];
    let bl = [{slot: 6, state: 0,}];
    let bm = [{slot: 7, state: 0,}];
    let br = [{slot: 8, state: 0,}];

    const gameBoard = [tl,tm,tr,
                       ml,mm,mr,
                       bl,bm,br];

    const displayGameBoard = () => {
        const gameSlotArray = document.querySelectorAll(".gameSlot");
        gameSlotArray.forEach((div) => {
            div.textContent = "X";
        })
        // return gameSlotArray;
    };

    return {
        gameBoard,
        displayGameBoard,
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

})

