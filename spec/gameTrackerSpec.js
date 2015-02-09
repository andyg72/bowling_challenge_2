var GameTracker = require('../js/gameTracker.js');

describe('advancing rolls', function() {

  it('should return roll 2 frame 1 max score 10 after first roll of less than 10', function() {
    var gameTracker = new GameTracker({maxScoreInFrame: 10, maxRollsInFrame: 2});
    expect(gameTracker.nextRollValues({frame: 1, roll:1, score:4})).toEqual({frame: 1, roll:2, maxScore: 6});
  });

});
