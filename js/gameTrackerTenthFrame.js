var GameTracker = require('./gameTracker');

function GameTrackerTenthFrame(initValues) {
  GameTracker.call(this, initValues);
};

GameTrackerTenthFrame.prototype = Object.create(GameTracker.prototype);

GameTrackerTenthFrame.prototype.constructor = GameTrackerTenthFrame;

GameTrackerTenthFrame.prototype.nextRollValues = function(rollInput) {
  if ((rollInput.roll === this.maxRollsInFrame &&
      (rollInput.score + rollInput.frameScore) < this.maxScoreInFrame) ||
      rollInput.roll === this.maxRollsInFrame + 1) {
    return {gameOver: true}
  }
  else {
    var roll = this.nextRollNumber(rollInput);
    var frame = this.nextRollFrame(rollInput);
    var maxScore = this.nextRollMaxScore(rollInput);
    return {frame: frame, roll: roll, maxScore: maxScore};
  }
}

GameTrackerTenthFrame.prototype.nextRollNumber = function(rollInput) {
  return (rollInput.roll < this.maxRollsInFrame ||
          rollInput.score === this.maxScoreInFrame ||
          rollInput.frameScore + rollInput.score === this.maxScoreInFrame)
    ? rollInput.roll + 1
    : 1;
};

GameTrackerTenthFrame.prototype.nextRollFrame = function(rollInput) {
  return rollInput.frame;
};

module.exports = GameTrackerTenthFrame;
