var Game = require('../js/game');

describe('game', function() {

  var game;

  beforeEach(function() {
    game = new Game();
  });

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



});
