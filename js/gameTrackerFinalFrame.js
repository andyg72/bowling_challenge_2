var GameTracker = require('./gameTracker');

function GameTrackerFinalFrame(initValues) {
  GameTracker.call(this, initValues);
};

GameTrackerFinalFrame.prototype = Object.create(GameTracker.prototype);

GameTrackerFinalFrame.prototype.constructor = GameTrackerFinalFrame;

GameTrackerFinalFrame.prototype.nextRollValues = function(rollInput) {
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

GameTrackerFinalFrame.prototype.nextRollNumber = function(rollInput) {
  return (rollInput.roll < this.maxRollsInFrame ||
          rollInput.score === this.maxScoreInFrame ||
          rollInput.frameScore + rollInput.score === this.maxScoreInFrame)
    ? rollInput.roll + 1
    : 1;
};

GameTrackerFinalFrame.prototype.nextRollFrame = function(rollInput) {
  return rollInput.frame;
};

module.exports = GameTrackerFinalFrame;
