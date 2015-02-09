function GameTracker(initialValues) {
  this.maxScoreInFrame = initialValues.maxScoreInFrame;
  this.maxRollsInFrame = initialValues.maxRollsInFrame;
  this.firstRollInFrame = initialValues.firstFrameInRoll;
};


GameTracker.prototype.nextRollValues = function(rollInput) {
  var roll = this._nextRollNumber(rollInput);
  var frame = this._nextRollFrame(rollInput);
  var maxScore = this._nextRollMaxScore(rollInput);
  return {frame: frame, roll: roll, maxScore: maxScore};
};

GameTracker.prototype._nextRollNumber = function(rollInput) {
  return (rollInput.roll < this.maxRollsInFrame && rollInput.score < this.maxScoreInFrame)
    ? rollInput.roll + 1
    : 1;
};

GameTracker.prototype._nextRollFrame = function(rollInput) {
  return (rollInput.roll === this.maxRollsInFrame || rollInput.score === this.maxScoreInFrame)
    ? rollInput.frame + 1
    : rollInput.frame;
};

GameTracker.prototype._nextRollMaxScore = function(rollInput) {
  return (rollInput.roll === this.maxRollsInFrame || rollInput.score === this.maxScoreInFrame)
    ? this.maxScoreInFrame
    : this.maxScoreInFrame -= rollInput.score;
};

module.exports = GameTracker;
