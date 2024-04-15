let game = {
    score : 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    turnInProgess: false,
    choices: ["button1", "button2", "button3", "button4"],
}

function newGame() {
    game.score = 0;
    game.playerMoves = [];
    game.currentGame = [];
    const x = document.getElementsByClassName('circle');
    for (let i = 0; i < x.length; i++) {
        if (x[i].getAttribute('data-listener') !== 'true') {
            x[i].addEventListener('click', (e) => {
                let move = e.target.getAttribute('id');
                lightsOn(move);
                game.playerMoves.push(move);
                playerTurn();
            });
        x[i].setAttribute('data-listener', 'true');
        }
    }
    showScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * (4 - 1 + 1)) + 1)]);
    showTurns();
}

function showScore() {
    document.getElementById('score').innerText = 0
}

function lightsOn(circle) {
    document.getElementById(circle).classList.add("light");
    setTimeout(() => {
        document.getElementById(circle).classList.remove("light");
    }, 400)
}

function showTurns() {
    game.turnInProgess = true;
    game.turnNumber = 0;
    let turns = setInterval(() => {

        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgess = false;
        }
    }, 800);
}

function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert("Wrong move!");
        newGame();
    }
}


module.exports = { game, newGame, showScore, addTurn, lightsOn, showTurns }