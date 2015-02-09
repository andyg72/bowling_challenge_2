var Frame = require('../js/frame');

describe('frame', function() {

  var frame;

  beforeEach(function() {
    frame = new Frame();
  });

  it('should add a score to the frame', function() {
    frame.addScore(5);
    expect(frame.rolls).toEqual([5]);
  });

  it('should add a second score to the frame', function() {
    frame.addScore(5);
    frame.addScore(3);
    expect(frame.rolls).toEqual([5,3]);
  });

  it('should add a frame total - one ball', function() {
    frame.addScore(5);
    expect(frame.frameTotal).toEqual(5);
  });

  it('should add a frame total - two balls', function() {
    frame.addScore(5);
    frame.addScore(3);
    expect(frame.frameTotal).toEqual(8);
  });

  it('should add a strike indicator to the frame - true', function() {
    frame.addScore(10);
    expect(frame.strike).toBe(true);
  });

  it('should add a strike indicator to the frame - false', function() {
    frame.addScore(9);
    expect(frame.strike).toBe(false);
  });

  it('should add a spare indicator to the frame - true', function() {
    frame.addScore(7);
    frame.addScore(3);
    expect(frame.spare).toBe(true);
  });

  it('should add a spare indicator to the frame - false', function() {
    frame.addScore(2);
    frame.addScore(4);
    expect(frame.spare).toBe(false);
  });

  it('should not add a spare indicator until a second roll is added', function() {
    frame.addScore(2);
    expect(frame.spare).toBe(undefined);
  });





});
