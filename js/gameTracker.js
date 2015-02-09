function GameTracker(initialValues) {
  this.maxScoreInFrame = initialValues.maxScoreInFrame;
  this.maxRollsInFrame = initialValues.maxRollsInFrame;
};


GameTracker.prototype.nextRollValues = function(rollInput) {
  var roll = (rollInput.roll < this.maxRollsInFrame && rollInput.score < this.maxScoreInFrame)
    ? rollInput.roll + 1
    : 1;
  var frame = (rollInput.roll === this.maxRollsInFrame || rollInput.score === this.maxScoreInFrame)
    ? rollInput.frame + 1
    : rollInput.frame;
  console.log(rollInput.roll, this.maxRollsInFrame, rollInput.score, this.maxScoreInFrame);
  var maxScore = frame !== rollInput.frame
    ? this.maxScoreInFrame
    : this.maxScoreInFrame -= rollInput.score;
  return {frame: frame, roll: roll, maxScore: maxScore};
};


module.exports = GameTracker;
