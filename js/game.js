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
  while (frame.next !== undefined) {
    this.gameScore += frame.score();
    frame = frame.nextFrame();
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


module.exports = Game
