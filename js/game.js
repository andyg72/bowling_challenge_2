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
};

Game.prototype.addScore = function(score) {
  if (this.rollNumber === 1) {
    if (this.firstFrame === undefined) {
      this.firstFrame = new Frame();
    }
    this.firstFrame.addScoreNewFrame(score);
  }
  this.firstFrame.addScoreLatestFrame(score);
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
}


module.exports = Game
