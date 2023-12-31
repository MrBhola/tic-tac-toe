document.addEventListener("DOMContentLoaded", function () {
    const boxes = document.querySelectorAll(".box");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    boxes.forEach(box => {
        box.addEventListener("click", () => {
            const index = parseInt(box.id) - 1;

            if (gameBoard[index] === "" && !checkWinner()) {
                gameBoard[index] = currentPlayer;
                box.textContent = currentPlayer;
                box.style.pointerEvents = "none";
                currentPlayer = currentPlayer === "X" ? "O" : "X";

                if (checkWinner()) {
                    alert(`${currentPlayer === "X" ? "O" : "X"} wins!`);
                } else if (!gameBoard.includes("")) {
                    alert("It's a draw!");
                }
            }
        });
    });

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }
});
