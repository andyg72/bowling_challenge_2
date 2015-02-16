var Game = require('../js/game');

var game;

beforeEach(function() {
  game = new Game();
});

describe('game', function() {

  describe('game scoring', function() {

    it('should be zero by default', function() {
      expect(game.gameScore).toEqual(0);
    });

    it('should be able to add a first roll score to the first frame', function() {
      game.addScore(5);
      expect(game.totalScore()).toEqual(5);
    });

    it('should be able to add a second roll score to the first frame', function() {
      game.addScore(5);
      game.addScore(4);
      expect(game.totalScore()).toEqual(9);
    });

    it('should be able to add a first roll score to the second frame', function() {
      game.addScore(5);
      game.addScore(4);
      game.addScore(7);
      expect(game.totalScore()).toEqual(16);
    });

    it('should be able to correctly score a spare', function() {
      game.addScore(4);
      game.addScore(6);
      game.addScore(7);
      expect(game.totalScore()).toEqual(24);
    });

    it('should be able to correctly score a strike', function() {
      game.addScore(10);
      game.addScore(6);
      game.addScore(3);
      expect(game.totalScore()).toEqual(28);
    });

    it('should be able to correctly score 2 strikes and a 5', function() {
      game.addScore(10);
      game.addScore(10);
      game.addScore(5);
      expect(game.totalScore()).toEqual(45);
    });

    it('should be able to correctly score 3 strikes', function() {
      game.addScore(10);
      game.addScore(10);
      game.addScore(10);
      expect(game.totalScore()).toEqual(60);
    });

    it('should know the frame score of the last frame', function() {
      game.addScore(10);
      game.addScore(10);
      game.addScore(5);
      expect(game.latestFrameScore()).toEqual(5);
    });

  });

  describe('final frame', function() {

    xit('should set up a final frame tracker from the first ball of the final frame', function() {
      game.frameNumber = 10;
      game.rollNumber = 1;
      game.rollScore = 4;
      game.rollTrackerUpdate;
      // expect(game.GameTrackerFinalFrame).shouldReceive(new);
    });

    it('should know when the game is over', function() {
      game.frameNumber = 10;
      game.rollNumber = 1;
      game.addScore(4);
      console.log(game.frameNumber, game.rollNumber, game.maxRollScore);
      expect(game.rollTrackerUpdate()).toEqual({gameOver: true});
    });

  });

});
