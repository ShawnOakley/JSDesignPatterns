// Objects to handle forms
// 3 main logic for forms:
// 1) Validation
// 2) Persistence
// 3) Feedback

// Example workflow of Form Object

// Make sure all fields that are required are present
// Make sure all values are valid
// Persist the data to the database
// Provide success or error feedback to the user

// Example app: Registering new students

// Application hands form data off to Form Object for 
// handling processing flow:

var _ = require('underscore');
var async = require('async');
var Q = require('q');
 
var NewStudentForm = function( formData ) {
  this.formData = formData;
};
 
NewStudentForm.prototype = _.extend( NewStudentForm.prototype, {
  
  process: function() {
    this.token = Q.defer();
 
    async.series([
      this.validate,
      this.persist,
    ], this.result );
    
    return this.token.promise;
  },
 
  validate: function( next ) {
    // validate object properties,
    // e.g. required fields, pattern matching, etc
    next();
  },
 
  persist: function( next ) {
    // persistence, such as write to DB or send to server
    new CreateNewStudent( this.formData ).run()
      .then(function() {
        next();
      })
      .fail( next );
  },
 
  result: function( err ) {
    // resolve or reject the deferred
    if ( err ) {
      this.error( err );
      this.token.reject( err );
    } else {
      this.token.resolve();
    }
  }
 
  error: function( err ) {
    // send errors back to the user
  }
 
});

// Form gives an API for execution in a controller or client-side view

// Example execution:

new NewStudentForm( formData ).process()
  .then(function() {
    // success callback
  })
  .fail(function() {
    // error callback
  });

  // Extending that: can create a Validation Object that guards form
  // values:

 var _ = require('underscore');
var async = require('async');
var Q = require('q');
 
var NewStudentFormValidator = function( formData ) {
  this.formData = formData;
};
 
NewStudentFormValidator.prototype = _.extend( NewStudentFormValidator.prototype, {
  
  validate: function() {
    this.token = Q.defer();
 
    async.series([
      this.validateEmail,
      this.validatePhoneNumber
      // any other validations
    ], this.result );
    
    return this.token.promise;
  },
 
  validateEmail: function( next ) {
    // run email validation
    next();
  },
 
  validatePhoneNumber: function( next ) {
    // run phone number validation
    next();
  },
 
  result: function( err ) {
    // resolve or reject the deferred
    if ( err ) {
      this.token.reject( err );
    } else {
      this.token.resolve();
    }
  }
 
});

// Validator use:

 
// Client-side
new NewStudentFormValidator( formData ).validate()
  .then(function() {
    // submit form to server via standard HTTP form
    // or via AJAX
  })
  .fail(function( err ) {
    // message errors to user
  });
 
// Server-side (application route)
new NewStudentFormValidator( formData ).validate()
  .then(function() {
    return new CreateNewStudent( formData ).run();
  })
  .then(function() {
    // send user to the success page
  })
  .fail(function( err ) {
    // set flash, send user back to form
  });
 
// Server-side (API route)
new NewStudentFormValidator( formData ).validate()
  .then(function() {
    return new CreateNewStudent( formData ).run();
  })
  .then(function() {
    // send 200 OK
  })
  .fail(function( err ) {
    // send 422 with errors
  });