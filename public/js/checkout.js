$(document).ready(function () {
    // function to determine if all input text fields have been filled 
    function isFilled () {
        var fnameEmpty = $('#fname').val().length > 0 ? true : false; 
        var emailEmpty = $('#email').val().length > 0 ? true : false; 
        var addressEmpty = $('#address').val().length > 0 ? true : false; 
        var cityEmpty = $('#city').val().length > 0 ? true : false; 
        var stateEmpty = $('#state').val().length > 0 ? true : false; 
        var zipEmpty = $('#zip').val().length > 0 ? true : false; 
        var cnameEmpty = $('#cname').val().length > 0 ? true : false; 
        var ccnumEmpty = $('#ccnum').val().length > 0 ? true : false; 
        var expmonthEmpty = $('#expmonth').val().length > 0 ? true : false; 
        var expyearEmpty = $('#expyear').val().length > 0 ? true : false; 
        var cvvEmpty = $('#cvv').val().length > 0 ? true : false; 

        return fnameEmpty && emailEmpty && addressEmpty && cityEmpty && stateEmpty && 
               zipEmpty && cnameEmpty && ccnumEmpty && expmonthEmpty && expyearEmpty && 
               cvvEmpty; 
    }

    // function to determine if credit card number inputted has valid format 
    function isValid () {
        // get credit card number input 
        var ccnum = $('#ccnum');

        // determine if valid format or not 
        if (ccnum.val().length > 0 && ccnum.val().length < 16) {
            $('#ccnumError').text('Credit card number must be 16 digits');
            return false; 
        }
        else 
            $('#ccnumError').text('');
        
        return true; 
    }

    // function to determine if credit card is expired 
    function isExpired () {
        var today = new Date();
        var month = today.getMonth() + 1;
        var year = today.getFullYear();

        if ((month >= parseInt($('#expmonth').val()) && year >= parseInt($('#expyear').val())) || year > parseInt($('#expyear').val())) {
            $('#expyearError').text('Credit card already expired!');
            return false; 
        }
        else 
            $('#expyearError').text('');
        
        return true; 
    }

    // function to validate an input text field 
    function validateField (field, fieldName, error) {
        // get user input value 
        var value = field.val().trim(); 

        // if no input was given in the text field 
        if (value.length === 0) {
            // delete whitespaces if there is 
            field.prop('value', ''); 

            // display error messages about text field being empty 
            error.text('Please input your ' + fieldName); 
        }
        else 
            // remove error message 
            error.text(''); 
        
        // determine if all input text fields have been filled with input 
        var filled = isFilled(); 

        // determine if credit card number entered has valid format 
        var valid = isValid(); 

        // determine if credit card is expired or not 
        var expired = isExpired();

        // if all inputted values are valid and ready for submission 
        if (filled && valid && expired) {
            // enable checkout button
            $('#confirm-checkout').addClass('hvr-border-fade');
            $('#confirm-checkout').prop('disabled', false);
            $('#confirm-checkout').css('color', 'white'); 
            $('#confirm-checkout').css('border-color', 'white');
            $('#confirm-checkout').css('cursor', 'pointer');
        }
        else {
            // disable checkout button 
            $('#confirm-checkout').removeClass('hvr-border-fade');
            $('#confirm-checkout').prop('disabled', true);
            $('#confirm-checkout').css('color', 'gray');
            $('#confirm-checkout').css('border-color', 'gray');
            $('#confirm-checkout').css('cursor', 'auto');
        }
    }

    // for full name input text field 
    $('#fname').keyup(function () {
        validateField ($('#fname'), 'full name', $('#fnameError')); 
    });

    // for email input text field 
    $('#email').keyup(function () {
        validateField($('#email'), 'email', $('#emailError'));
    });

    // for address input text field 
    $('#address').keyup(function () {
        validateField($('#address'), 'address', $('#addressError'));
    });

    // for city input text field 
    $('#city').keyup(function () {
        validateField($('#city'), 'city', $('#cityError'));
    });

    // for state input text field 
    $('#state').keyup(function () {
        validateField($('#state'), 'state', $('#stateError'));
    });

    // for zip input text field 
    $('#zip').keyup(function () {
        validateField($('#zip'), 'zip', $('#zipError'));
    });

    // for card name input text field 
    $('#cname').keyup(function () {
        validateField($('#cname'), 'card name', $('#cnameError'));
    });

    // for card number input text field 
    $('#ccnum').keyup(function () {
        validateField($('#ccnum'), 'card number', $('#ccnumError'));
    });

    // for exp month input text field
    $('#expmonth').keyup(function () {
        validateField($('#expmonth'), 'exp month', $('#expmonthError'));
    });

    // for exp year input text field 
    $('#expyear').keyup(function () {
        validateField($('#expyear'), 'exp year', $('#expyearError'));
    });

    // for CVV input text field 
    $('#cvv').keyup(function () {
        validateField($('#cvv'), 'CVV', $('#cvvError'));
    });
})