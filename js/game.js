var GameTracker = require('./gameTracker');
var Frame = require('./frame')

var Game = function() {
  this.maxScoreInFrame = 10;
  this.maxRollsInFrame = 2;
  this.firstFrame = undefined;
  this.frameNumber = 1;
  this.rollNumber = 1;
  this.maxRollScore = 10;
  this.rollScore = undefined;
  this.gameScore = 0;
  this.gameTracker = new GameTracker({maxScoreInFrame: this.maxScoreInFrame,
                                      maxRollsInFrame: this.maxRollsInFrame});
};


Game.prototype.addScore = function(score) {
  if (this.firstFrame === undefined) {
    this.firstFrame = new Frame();
  }
  if (this.rollNumber === 1 && this.frameNumber !== 1) {
    this.firstFrame.addScoreNewFrame(score);
  }
  else {
  this.firstFrame.addScoreLatestFrame(score);
  }
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
  var rollValues = {};
  rollValues.frame = this.frameNumber;
  rollValues.roll = this.rollNumber;
  rollValues.score = this.rollScore;
  var nextRollValues = this.gameTracker.nextRollValues(rollValues);
  this.frameNumber = nextRollValues.frame;
  this.rollNumber = nextRollValues.roll;
  this.maxRollScore = nextRollValues.maxRollScore;
};

Game.prototype.lastFrameScore = function() {
  var frame = this.firstFrame;
  var current = frame;
  while (frame.next !== undefined) {
    frame = frame.nextFrame();
    current = frame
  }
  return current.score();
};


module.exports = Game
