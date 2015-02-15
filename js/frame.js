function Frame() {
  this.rolls = [];
  this.strike = undefined;
  this.spare = undefined;
  this.next = undefined;
};

Frame.prototype.addScoreLatestFrame = function(score) {
  console.log('using Latest Frame');
  var frame = this;
  var current = frame;
  while (frame.next !== undefined ) {
    current = frame;
    frame = frame.nextFrame();
  }
  frame.addScore(score);
};

Frame.prototype.addScoreNewFrame = function(score) {
  console.log('using New Frame');
  var frame = this;
  var current = frame;
  while (frame.next !== undefined ) {
    frame = frame.nextFrame();
    current = frame;
  }
  console.log(current.rolls);
  console.log(current.next);
  current.next = new Frame();
  current.next.addScore(score);
};

Frame.prototype.nextFrame = function() {
  return this.next;
};

Frame.prototype.addScore = function(score) {
  this.rolls.push(score);
  this._setStrikeIndicator();
  this._setSpareIndicator();
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
    this.rolls[0] === 10
    ? this.strike = true
    : this.strike = false;
  }
};

Frame.prototype._setSpareIndicator = function() {
  if (this.spare === undefined && (this.rolls.length > 1 || this.strike === true)) {
    (this.rolls[0] + this.rolls[1]) === 10 && this.strike === false
    ? this.spare = true
    : this.spare = false;
  }
};

Frame.prototype.nextFrame = function () {
  return this.next
};

module.exports = Frame
