describe('Data Validation', function(){
  describe('Provider', function(){
    var provider;

    beforeEach(module('nag.dataValidation', function(nagDataValidationProvider) {
      provider = nagDataValidationProvider;
    }));

    it('should be able to add a validator', inject(function(nagDataValidation) {
      provider.add('test', function(value1) {
        return value1 === 'qwerty';
      });

      expect(nagDataValidation.validate('test', 'qwerty')).toBe(true);
    }));

    it('should be able to add a validator', inject(function(nagDataValidation) {
      provider.add('test', function(value1) {
        return value1 === 'qwerty';
      });

      expect(nagDataValidation.validate('test', 'werty')).toBe(false);
    }));

    it('should be able to overwrite an existing validator', inject(function(nagDataValidation) {
      provider.add('email', function(value1) {
        return false;
      });

      expect(nagDataValidation.validate('email', 'test@example.com')).toBe(false);
    }));
  });

  describe("Basic Functionality", function() {
    var nagDataValidation;

    beforeEach(module('nag.dataValidation'));

    beforeEach(inject(function($injector) {
      nagDataValidation = $injector.get('nagDataValidation');
    }));

    it('should validate email as valid', function() {
      expect(nagDataValidation.validate('email', 'test@example.com')).toBe(true);
    });

    it('should validate non-email as invalid', function() {
      expect(nagDataValidation.validate('email', 'test@example')).toBe(false);
    });

    it('should validate string as not empty', function() {
      expect(nagDataValidation.validate('notEmpty', 'test@example.com')).toBe(true);
    });

    it('should validate null as empty', function() {
      expect(nagDataValidation.validate('notEmpty', null)).toBe(false);
    });

    it('should validate 20 as not less than 10', function() {
      expect(nagDataValidation.validate('minValue', 20, 10)).toBe(true);
    });

    it('should validate 10 as less than 20', function() {
      expect(nagDataValidation.validate('minValue', 10, 20)).toBe(false);
    });

    it('should validate 20 as more than 10', function() {
      expect(nagDataValidation.validate('maxValue', 20, 10)).toBe(false);
    });

    it('should validate 10 as not more than 20', function() {
      expect(nagDataValidation.validate('maxValue', 10, 20)).toBe(true);
    });

    it('should validate 15 is within 10 and 20', function() {
      expect(nagDataValidation.validate('rangeValue', 15, 10, 20)).toBe(true);
    });

    it('should validate 30 as not within 10 to 20', function() {
      expect(nagDataValidation.validate('rangeValue', 30, 10, 20)).toBe(false);
    });

    it('should validate matching data as valid', function() {
      expect(nagDataValidation.validate('match', 'test', 'test')).toBe(true);
    });

    it('should validate non match data as invalid', function() {
      expect(nagDataValidation.validate('match', 'invalid', 'match')).toBe(false);
    });

    it('should be able to do on the fly custom validation', function() {
      expect(nagDataValidation.validate('custom', function(value1, value2) {
        return value1 === 'test' && value2 === 'test2'
      }, 'test', 'test2')).toBe(true);
    });

    it('should validate "this is a test" has at least 10 characters', function() {
      expect(nagDataValidation.validate('minLength', 'this is a test', 10)).toBe(true);
    });

    it('should validate "this is a test" does not have at least 20 characters', function() {
      expect(nagDataValidation.validate('minLength', 'this is a test', 20)).toBe(false);
    });

    it('should validate "this is a test" does not exceed 20 characters', function() {
      expect(nagDataValidation.validate('maxLength', 'this is a test', 20)).toBe(true);
    });

    it('should validate "this is a test" does exceed 10 characters', function() {
      expect(nagDataValidation.validate('maxLength', 'this is a test', 10)).toBe(false);
    });

    it('should validate "this is a test" has between 10 and 20 characters', function() {
      expect(nagDataValidation.validate('rangeLength', 'this is a test', 10, 20)).toBe(true);
    });

    it('should validate "this" does not have between 10 and 20 characters', function() {
      expect(nagDataValidation.validate('rangeLength', 'this', 10, 20)).toBe(false);
    });
  });
});
