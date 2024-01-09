let boxes = document.querySelectorAll(".box");
let restartBtn = document.getElementById("reset-game-btn");
let msgContainer = document.querySelector('.msg-container');
let msg = document.querySelector('#msg');


let turn0 = true;  //turn of player 0
let boxClickCount = 0 //to check end of game;

const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 4, 2],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            turn0 = false;
        }
        else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true;
        boxClickCount += 1;

        checkWinner();
    })
})

const restartGame = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = ""
        boxClickCount = 0;
    }
    msgContainer.classList.add("hide");
    turn0 = true;
}
const stopGame = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulation, The Winner is "${winner}" !!!`;
    msgContainer.classList.remove("hide")
    // show party poper
            party.sparkles(msgContainer, {
                count: party.variation.range(200, 40),
            });
            party.confetti(msgContainer, {
                count: party.variation.range(100, 400),
            });
}

const checkWinner = () => {
    for (let patern of winningPatterns) {
        let pos1Val = boxes[patern[0]].innerText;
        let pos2Val = boxes[patern[1]].innerText;
        let pos3Val = boxes[patern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                stopGame();
            } else if (boxClickCount === 9) {
                msgContainer.classList.remove('hide');
                msg.innerText = "Opps.. It's a DRAW...!!!"
            }
        }
    }
}
restartBtn.addEventListener("click", restartGame);
