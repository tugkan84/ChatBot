var assert = require('assert');
const Game = require("../Game");
const GameState = require("../GameState");

describe('Game', function () {
  describe('First', function () {
    it('should set welcoming GameState', function () {
        var game = new Game();        
        assert.strictEqual(game.stateCur, GameState.WELCOMING);
    });
    it('should return correct reply', function () {
        var game = new Game();
        assert.strictEqual(game.makeAMove("go")[0], "It is a dark and rainy night. Bang! You have a flat tire. Too bad you don't have a spare. Do you WAIT or GO to the spooky mansion for help?");
        assert.strictEqual(game.stateCur, GameState.FLAT);
    });
    it('should move in correct route', function () {
        var game = new Game();
        game.makeAMove("go")[0];
        assert.strictEqual(game.stateCur, GameState.FLAT);
        game.makeAMove("knocker")[0];
        assert.strictEqual(game.stateCur, GameState.MANSION);
        game.makeAMove("knocker")[0];
        assert.strictEqual(game.stateCur, GameState.BUTLER);
        game.makeAMove("run")[0];
        assert.strictEqual(game.stateCur, GameState.FLAT);

    });
    it('should return correct string for WAKE', function () {
        var game = new Game();
        game.stateCur = GameState.WAKE
        var result = game.makeAMove("go")[0];
        assert.strictEqual(game.stateCur, GameState.WELCOMING);
        assert.strictEqual(result, "You wake up suddenly from the dream and you are in your car, a tow truck is coming towards you. It was all a dream. or was it not?<<send ay word to start again>>");
        
        game.stateCur = GameState.WAKE
        var result = game.makeAMove("red")[0];
        assert.strictEqual(game.stateCur, GameState.WELCOMING);
        assert.strictEqual(result, "You woke up from sleep and you are in a dark place, that is, in the grave.<<send ay word to start again>>");
    
    });
  });
});