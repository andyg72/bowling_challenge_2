function Frame() {
  this.rolls = [];
  this.frameTotal = 0;
  this.bonusTotal = undefined;
  this.cumulativeTotal = undefined;
  this.strike = undefined;
  this.spare = undefined;

};


Frame.prototype.addScore = function(score) {
  this.rolls.push(score);
  this._setFrameTotal();
  this._setStrikeIndicator();
  this._setSpareIndicator();
};

Frame.prototype._setFrameTotal = function() {
  this.frameTotal += this.rolls[this.rolls.length-1];
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
    this.frameTotal === 10 && this.strike === false
    ? this.spare = true
    : this.spare = false;
  }
};

Frame.prototype.nextFrame = function () {
  return this.next
};

module.exports = Frame
