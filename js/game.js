var GameTracker = require('./gameTracker');
var GameTrackerFinalFrame = require('./gameTrackerFinalFrame');
var Frame = require('./frame')

var Game = function() {
  this.maxScoreInFrame = 10;
  this.maxRollsInFrame = 2;
  this.gameTrackerInitValues = {maxScoreInFrame: this.maxScoreInFrame,
                                maxRollsInFrame: this.maxRollsInFrame}
  this.gameTracker = new GameTracker(this.gameTrackerInitValues);
  this.gameTrackerFinalFrame = undefined;
  this.firstFrame = new Frame();
  this.framesInGame = 10;
  this.frameNumber = 1;
  this.rollNumber = 1;
  this.maxRollScore = 10;
  this.rollScore = undefined;
  this.gameScore = 0;
  this.gameOver = undefined;
};


Game.prototype.addScore = function(score) {
  (this.rollNumber === 1 && this.frameNumber === 1)
    ? this.firstFrame.addScoreFirstBall(score)
    : this.firstFrame.addScore(score);
  this.rollScore = score;
  this.rollTrackerUpdate();
};

Game.prototype.totalScore = function() {
  if (this.gameScore > 0) {
    this.gameScore = 0;
  }
  var frame = this.firstFrame;
  this.gameScore += frame.score();
  while (frame.next !== undefined) {
    frame = frame.nextFrame();
    this.gameScore += frame.score();
  }
  return this.gameScore;
};

Game.prototype.rollTrackerUpdate = function() {
  var rollValues = this._setRollValues();
  if (this.frameNumber === this.framesInGame && this.rollNumber === 1) {
    this.gameTrackerFinalFrame = new GameTrackerFinalFrame(this.gameTrackerInitValues);
  }
  var nextRollValues = (this.frameNumber === this.framesInGame)
    ? this.gameTrackerFinalFrame.nextRollValues(rollValues)
    : this.gameTracker.nextRollValues(rollValues);
  (nextRollValues.gameOver !== undefined)
    ? this.gameOver = true
    : this._setNextRollValues(nextRollValues);
};

Game.prototype._setNextRollValues = function(nextRollValues) {
  this.frameNumber = nextRollValues.frame;
  this.rollNumber = nextRollValues.roll;
  this.maxRollScore = nextRollValues.maxRollScore;
};

Game.prototype._setRollValues = function() {
  var rollValues = {};
  rollValues.frame = this.frameNumber;
  rollValues.roll = this.rollNumber;
  rollValues.score = this.rollScore;
  return rollValues;
};


Game.prototype.latestFrameScore = function() {
  var frame = this.firstFrame;
  var current = frame;
  while (frame.next !== undefined) {
    frame = frame.nextFrame();
    current = frame
  }
  return current.score();
};

module.exports = Game
