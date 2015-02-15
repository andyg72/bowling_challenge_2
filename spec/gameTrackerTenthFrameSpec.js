var GameTrackerTenthFrame = require ('../js/gameTrackerTenthFrame.js')


  beforeEach(function() {
    gameTrackerTenthFrame = new GameTrackerTenthFrame({maxScoreInFrame: 10, maxRollsInFrame: 2});
  });

  describe ('the tenth frame', function() {

    describe ('advancing to next ball', function () {

      it('should move to second roll if less than 10 scored on first ball', function() {
        expect(gameTrackerTenthFrame.nextRollValues({frame: 10, roll:1, score:4})).toEqual({frame: 10, roll:2, maxScore: 6})
      });

      it('should move to second roll if a strike scored on first ball', function() {
        expect(gameTrackerTenthFrame.nextRollValues({frame: 10, roll:1, score:10})).toEqual({frame: 10, roll:2, maxScore: 10})
      });

      it('should move to third roll if a strike scored on second ball', function() {
        expect(gameTrackerTenthFrame.nextRollValues({frame: 10, roll:2, score:10})).toEqual({frame: 10, roll:3, maxScore: 10})
      });

      it('should move to a third roll if a spare scored on first two balls', function() {
        expect(gameTrackerTenthFrame.nextRollValues({frame: 10, roll:2, score:4, frameScore:6})).toEqual({frame: 10, roll:3, maxScore: 10})
      });

      it('should move to a third roll if strikes scored on first two balls', function() {
        expect(gameTrackerTenthFrame.nextRollValues({frame: 10, roll:2, score:10, frameScore:10})).toEqual({frame: 10, roll:3, maxScore: 10})
      });

    });

    describe ('determining the game is over', function() {

      it('should declare the game over if less than ten scored on first two balls', function() {
        expect(gameTrackerTenthFrame.nextRollValues({frame: 10, roll:2, score:3, frameScore:5})).toEqual({gameOver: true})
      });

      it('should declare game over if once the 3rd ball has been played', function() {
        expect(gameTrackerTenthFrame.nextRollValues({frame: 10, roll:3, score:3})).toEqual({gameOver: true})        
      });

    });

  });
