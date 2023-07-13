$(document).ready(function () {
    // function to determine if all input text fields have been filled 
    function isFilled() {
        // username
        var userEmpty = $('#user').val().length > 0 ? true : false;
        // password 
        var passEmpty = $('#pass').val().length > 0 ? true : false; 

        return userEmpty && passEmpty; 
    }

    // function to validate an input text field 
    function validateField (field, fieldName, error) {
        // get user input value 
        var value = field.val().trim(); 

        // if no input was given in the text field 
        if (value.length === 0) {
            // delete whitespaces if there is 
            field.prop('value', ''); 

            // display error message about text field being empty 
            error.text('Please input your ' + fieldName); 
        }
        else 
            // remove error message 
            error.text(''); 
        
        // determine if all input text fields have been filled with input
        if (isFilled()) {
            // enable submit button
            $('#submit').removeClass('clickable-disabled');
            $('#submit').addClass('clickable');
            $('#submit').prop('disabled', false);
        }
        else {
            // disable submit button
            $('#submit').removeClass('clickable');
            $('#submit').addClass('clickable-disabled');
            $('#submit').prop('disabled', true);
        }
    }

    // for username input text field 
    $('#user').keyup(function () {
        validateField($('#user'), 'username', $('#userError'));
    });

    // for password input text field 
    $('#pass').keyup(function () {
        validateField ($('#pass'), 'password', $('#passError'));
    });
})