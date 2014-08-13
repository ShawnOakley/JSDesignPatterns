// Service Object: Object that performs a discrete operation or action.
// Useful for when a process becomes complex, hard to test, or
// touches more than one type of model

// Goal of Service Object is to isolate an operation, and should
// aim to follow these principles:

// Strict with input and output.  Service Objects should be
// designed to handle very specific process
// Documented thoroughly.
// Terminates after operation is complete.  As opposed to worker
// process, which could set an interval, listen for web socket
// messages continuously, or some other operation to which
// there is no immediate end.

// http://journal.crushlovely.com/post/88286835473/7-patterns-to-refactor-javascript-applications-service

var _ = require('underscore');
 
var DetermineStudentPassingStatus = function( student ) {
  this.student = student;
}
 
DetermineStudentPassingStatus.prototype = _.extend( DetermineStudentPassingStatus.prototype, {
 
  minimumPassingPercentage: 0.6,
 
  fromAssignments: function( assignments ) {
    return _.compose(
      this.determinePassingStatus.bind( this ),
      this.averageAssignmentGrade,
      this.extractAssignmentGrades
    )( assignments );
  },
 
  extractAssignmentGrades: function( assignments ) {
    return _.pluck( assignments, 'grade' );
  },
 
  averageAssignmentGrade: function( grades ) {
    return grades.reduce( function( memo, grade ) {
      return memo + grade.percentage;
    }, 0) / grades.length;
  },
 
  determinePassingStatus: function( averageGrade ) {
    return averageGrade >= this.minimumPassingPercentage;
  }
 
});
 
module.exports = DetermineStudentPassingStatus;

var _ = require('underscore');
 
var DetermineStudentPassingStatus = function( student ) {
  this.student = student;
}
 
DetermineStudentPassingStatus.prototype = _.extend( DetermineStudentPassingStatus.prototype, {
 
  minimumPassingPercentage: 0.6,
 
  fromAssignments: function( assignments ) {
    return _.compose(
      this.determinePassingStatus.bind( this ),
      this.averageAssignmentGrade,
      this.extractAssignmentGrades
    )( assignments );
  },
 
  extractAssignmentGrades: function( assignments ) {
    return _.pluck( assignments, 'grade' );
  },
 
  averageAssignmentGrade: function( grades ) {
    return grades.reduce( function( memo, grade ) {
      return memo + grade.percentage;
    }, 0) / grades.length;
  },
 
  determinePassingStatus: function( averageGrade ) {
    return averageGrade >= this.minimumPassingPercentage;
  }
 
});
 
module.exports = DetermineStudentPassingStatus;

