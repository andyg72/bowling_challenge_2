function Frame() {
  this.rolls = [];
  this.strike = undefined;
  this.spare = undefined;
  this.next = undefined;
};

Frame.prototype.addScoreFirstBall = function(score) {
  this._addScoreCurrentFrame(score)
};

Frame.prototype.addScore = function(score) {
  var latestFrame = this._latestFrame();
  (latestFrame.spare === undefined)
    ? latestFrame._addScoreCurrentFrame(score)
    : latestFrame._addScoreNewFrame(score);
};

Frame.prototype._latestFrame = function() {
  var frame = this;
  var current = frame;
  while (frame.next !== undefined) {
    frame = frame.nextFrame();
    current = frame;
  }
  return current;
};

Frame.prototype._addScoreCurrentFrame = function(score) {
  this.rolls.push(score);
  this._setStrikeIndicator();
  this._setSpareIndicator();
};

Frame.prototype._addScoreNewFrame = function(score) {
  this.next = new Frame();
  this.next._addScoreCurrentFrame(score);
};

Frame.prototype.nextFrame = function() {
  return this.next;
};

Frame.prototype.score = function() {
  var frameScore = 0;
  for (var i = 0; i < this.rolls.length; i++) {
    frameScore += this.rolls[i];
  }
  if (this.spare === true && this.next !== undefined) {
    frameScore += this.next.rolls[0];
  }
  if (this.strike === true && this.next !== undefined) {
    frameScore += this.next.rolls[0];
    if (this.next.rolls[1] !== undefined) {
      frameScore += this.next.rolls[1];
    } else if (this.next.next !== undefined) {
      frameScore += this.next.next.rolls[0];
    }
  }
  return frameScore;
};


Frame.prototype._setStrikeIndicator = function() {
  if (this.strike === undefined) {
    this.strike = (this.rolls[0] === 10)
    ? true
    : false;
  }
};

Frame.prototype._setSpareIndicator = function() {
  if (this.spare === undefined && (this.rolls.length > 1 || this.strike === true)) {
    this.spare = ((this.rolls[0] + this.rolls[1]) === 10 && this.strike === false)
    ? true
    : false;
  }
};

module.exports = Frame
