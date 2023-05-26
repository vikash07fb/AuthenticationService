const { StatusCodes } = require('http-status-codes');
const AppErrors = require('./error-handler');


class UniqueConstraintError extends AppErrors {
    
      constructor(error) {
        let errorName = error.name;
        let explanation = error.errors[0].message;
       

        super(
            errorName,
            'Email is already registered',
            explanation,
            StatusCodes.BAD_REQUEST
        );
      }
    
}

module.exports = UniqueConstraintError