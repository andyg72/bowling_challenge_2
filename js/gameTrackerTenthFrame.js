var GameTracker = require('./gameTracker');

function GameTrackerTenthFrame(initValues) {
  GameTracker.apply(this, initValues);
};

GameTrackerTenthFrame.prototype = new GameTracker();

GameTrackerTenthFrame.prototype.nextRollValues = function(rollInput) {
  if ((rollInput.roll === this.maxRollsInFrame &&
      (rollInput.score + rollInput.frameScore) < this.maxScoreInFrame) ||
      rollInput.roll === this.maxRollsInFrame + 1) {
    return {gameOver: true}
  }
  else {
    var roll = this._nextRollNumber(rollInput);
    var frame = this._nextRollFrame(rollInput);
    var maxScore = this._nextRollMaxScore(rollInput);
    return {frame: frame, roll: roll, maxScore: maxScore};
  }
}

GameTrackerTenthFrame.prototype._nextRollNumber = function(rollInput) {
  return (rollInput.roll < this.maxRollsInFrame ||
          rollInput.score === this.maxScoreInFrame ||
          rollInput.frameScore + rollInput.score === this.maxScoreInFrame)
    ? rollInput.roll + 1
    : 1;
};

GameTrackerTenthFrame.prototype._nextRollFrame = function(rollInput) {
  return rollInput.frame;
};

// GameTrackerTenthFrame.prototype._nextRollMaxScore = function(rollInput) {
//   return (rollInput.roll === this.maxRollsInFrame ||
//           rollInput.score === this.maxScoreInFrame)
//     ? this.maxScoreInFrame
//     : this.maxScoreInFrame - rollInput.score;
// };

module.exports = GameTrackerTenthFrame;
