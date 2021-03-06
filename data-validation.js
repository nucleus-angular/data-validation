/**
 * Data Validation Service
 *
 * @todo: should this be outside of angular?
 *
 * @module nag.dataValidation
 * @ngservice nagDataValidation
 */
angular.module('nag.dataValidation', [])
.provider('nagDataValidation', function() {
  var validators = {
    email: function(value){
      var regex = new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i);
      return regex.test(value);
    },

    notEmpty: function(value){
      var test = value;
      return (test != 0 && test != undefined);
    },

    minValue: function(value, minValue){
      var value = parseInt(value)
      return (!_(value).isNaN() && value >= minValue);
    },

    maxValue: function(value, maxValue){
      var value = parseInt(value)
      return (!_(value).isNaN() && value <= maxValue);
    },

    rangeValue: function(value, minValue, maxValue){
      var value = parseInt(value)
      return (!_(value).isNaN() && value >= minValue && value <= maxValue);
    },

    minLength: function(value, minValue){
      return (_(value).isString() && value.length >= minValue);
    },

    maxLength: function(value, maxValue){
      return (_(value).isString() && value.length <= maxValue);
    },

    rangeLength: function(value, minValue, maxValue){
      return (_(value).isString() && value.length >= minValue && value.length <= maxValue);
    },

    match: function(value1, value2){
      return _(value1).isEqual(value2);
    },

    custom: function(callback) {
      var callbackParameters = Array.prototype.slice.call(arguments, 1);
      return callback.apply(null, callbackParameters);
    }
  };

  return {
    $get: function() {
      return {
        /**
         * Validate data.
         *
         * Additional parameters after validation type are the parameters required for the validation type.
         *
         * @method validate
         *
         * @param {string} validationType What validation you want to perform
         *
         * Built in validator include:
         *
         * - email
         * - notEmpty
         * - min
         * - max
         * - range
         * - match
         * - custom
         *
         * @return {boolean} Whether or not the data passed the validation
         */
        validate: function(validationType) {
          var validatorParameters = Array.prototype.slice.call(arguments, 1);
          return validators[validationType].apply(null, validatorParameters);
        }
      };
    },
    add: function(name, callback) {
      validators[name] = callback;
    }
  };
});
