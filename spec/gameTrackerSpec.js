var GameTracker = require('../js/gameTracker.js');

xdescribe('advancing rolls', function() {

  var gameTracker;

  beforeEach(function() {
    gameTracker = new GameTracker({maxScoreInFrame: 10, maxRollsInFrame: 2});
  });

  it('should return roll 2 frame 1 max score 10 after first roll of less than 10', function() {
    expect(gameTracker.nextRollValues({frame: 1, roll:1, score:4})).toEqual({frame: 1, roll:2, maxScore: 6});
  });

  it('should return roll 1 frame 2 max score 10 after second roll', function() {
    expect(gameTracker.nextRollValues({frame: 1, roll:2, score:4})).toEqual({frame: 2, roll:1, maxScore: 10});
  });

  it('should return roll 1 frame 2 max score 10 after first frame strike', function() {
    expect(gameTracker.nextRollValues({frame: 1, roll:1, score:10})).toEqual({frame: 2, roll:1, maxScore: 10});
  });

});
