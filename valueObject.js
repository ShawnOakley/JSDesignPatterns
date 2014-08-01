// Value objects: simple objects whose equality is dependent on their
// value rather than an identity

// Use case: Almost every valye in an application has logic
// associated with it, and the best place for that logic is on
// an instance of a value object

// Example:  Student grading application where students aggregate
// percentage scores are used to assign letter grades and
// determine passes and improvement levels

// http://journal.crushlovely.com/post/88286828068/7-patterns-to-refactor-javascript-applications-value

var _ = require('underscore');
 
var Grade = function( percentage ) {
  this.percentage = percentage;
  this.grade = this.grade( percentage ); 
};
 
Grade.prototype = _.extend( Grade.prototype, {
 
  grades: [
    { letter: 'A', minimumPercentage: 0.9, passing: true },
    { letter: 'B', minimumPercentage: 0.8, passing: true },
    { letter: 'C', minimumPercentage: 0.7, passing: true },
    { letter: 'D', minimumPercentage: 0.6, passing: true },
    { letter: 'F', minimumPercentage: 0,   passing: false }
  ],
 
  passingGradeLetters: function() {
    return _.chain( this.grades ).where({ passing: true }).pluck('letter').value();
  },
 
  grade: function( percentage ) {
    return _.find( this.grades, function( grade ) { return percentage >= grade.minimumPercentage; });
  },
 
  letterGrade: function() {
    return this.grade.letter;
  },
 
  isPassing: function() {
    return this.grade.passing
  },
 
  isImprovementFrom: function( grade ) {
    return this.isBetterThan( grade );
  },
 
  isBetterThan: function( grade ) {
    return this.percentage > grade.percentage;
  },
 
// See below.  It is a good pattern to have the valueOf method return the same value that the object was initialized with, so that you can rebuild the object on the other end of the transport. This is particularly useful if the application has both a client-side and server-side application and share Value Objects. If you have the input and output use the same value, you can work with a Value Object on the server-side, send down the value to the client using valueOf, and then rebuild it on the client-side again.

  valueOf: function() {
    return this.percentage;
  }
 
});
 
module.exports = Grade;

// The above module can made code much more expressive
// Use example:

var firstStudent = { grade: new Grade(0.45) };
var secondStudent = { grade: new Grade(0.70) };

firstStudent.grade.isPassing() //=> false
firstStudent.grade.isBetterThan( secondStudent.grade ); //=> false

// Functional implementation

Grade.equal = function( grade1, grade2 ) {
  return grade1.valueOf() === grade2.valueOf();
}
 
var myFirstGrade = new Grade( 0.7 );
var mySecondGrade = new Grade( 0.7 );
Grade.equal( myFirstGrade, mySecondGrade ) // => true

