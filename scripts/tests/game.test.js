/**
 * @jest-environment jsdom
 */

const { lightsOn, addTurn, newGame, game, showScore, showTurns } = require("../game");

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close()
});

describe("Game object contains correct keys", () => {
    test("Score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("turnNumber key exists", () => {
        expect(game.turnNumber).toBe(0);
    });
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
});

describe("New game works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ['one', 'two'];
        game.currentGame = ['three', 'four'];
        document.getElementById('score').innerText = 42;
        newGame();
    });
    test("Should reset game score", () => {
        expect(game.score).toEqual(0);
    })
    test("playerMoves Array should be cleared", () => {
        expect(game.playerMoves).toEqual([]);
    })
    test("currentGame Array should have one element", () => {
        expect(game.currentGame.length).toBe(1);
    })
    test("Check is score in DOM reset to Zero", () => {
        expect(document.getElementById('score').innerText).toEqual(0);
    })
});


describe("Gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("sould add correct class to light up the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light")
    })
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0)
    })
    test('EventListeners added to circle divs, so user clicks detected', () => {
        const x = document.getElementsByClassName('circle');
        for (let i = 0; i < x.length; i++) {
            expect(x[i].getAttribute('data-listener')).toEqual('true');
        }
    })
    test('showTurns turns turnInProgress key to true', () => {
        showTurns();
        expect(game.turnInProgess).toEqual(true);
    })
});