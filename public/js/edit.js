$(document).ready(function () {
    // function to determine if all input text fields have been filled 
    function isFilled() {
        // first name 
        var fNameEmpty = $('#fName').val().length > 0 ? true : false;
        // last name 
        var lNameEmpty = $('#lName').val().length > 0 ? true : false;
        // username 
        var uNameEmpty = $('#uName').val().length > 0 ? true : false;
        // password
        var pWordEmpty = $('#pWord').val().length > 0 ? true : false;
        // email
        var emailEmpty = $('#email').val().length > 0 ? true : false;

        return fNameEmpty && lNameEmpty && uNameEmpty && pWordEmpty && emailEmpty;
    }

    // function to verify birth date (13 years old and above) 
    function isVerified() {
        // get birthdate and split date values 
        var date = $('#bDate').val().split("-");

        // check if user is 13 years old or above by checking the year
        if (parseInt(date[0]) <= 2007) {
            // remove error message if there is 
            $('#bDateError').text('');

            return true;
        }
        else {
            // display error message 
            $('#bDateError').text('You must be 13 years old or above to register!');

            return false;
        }
    }

    // function to validate an input text field 
    function validateField(field, fieldName, error) {
        // get user input value 
        var value = field.val().trim();

        // if no input was given in the text field 
        if (value.length === 0) {
            // delete whitespaces if there is 
            field.prop('value', '');

            // display error message about text field being empty 
            error.text('Please fill up with your ' + fieldName);
        }
        else
            // remove error message 
            error.text('');

        // determine if all input text fields have been filled with input 
        var filled = isFilled();

        // determine if birth date inputted is allowed 
        var verified = isVerified();

        // if all inputted values are valid and ready for submission
        if (filled && verified) {
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

    // for first name input text field
    $('#fName').keyup(function () {
        validateField($('#fName'), 'first name', $('#fNameError'));
    });

    // for last name input text field 
    $('#lName').keyup(function () {
        validateField($('#lName'), 'last name', $('#lNameError'));
    });

    // for username input text field 
    $('#uName').keyup(function () {
        validateField($('#uName'), 'username', $('#uNameError'));
    });

    // for password input text field 
    $('#pWord').keyup(function () {
        validateField($('#pWord'), 'password', $('#pWordError'));
    });

    // for email input text field 
    $('#email').keyup(function () {
        validateField($('#email'), 'email', $('#emailError'));
    });

    // for birth date input field (type input)
    $('#bDate').keyup(function () {
        validateField($('#bDate'), 'birthdate', $('#bDateError'));
    });

    // for birth date input field (select input)
    $('#bDate').change(function () {
        validateField($('#bDate'), 'birthdate', $('#bDateError'));
    });

    /* Adds listener for deleting account */
    $("#username-confirm").on ("keyup", function () {
        var username = $("#ref-username").html ().trim ().toLowerCase ();
        var user = {
            username: $("#username-confirm").val (),
            password: $("#password-confirm").val ()
        };

        $.get ("/user/" + username + "/verify", user, function (result) {
            var btn = $("#delete-button");
            if (result) {
                $(btn).removeClass("clickable-disabled");
                $(btn).addClass("clickable");
                $(btn).prop("disabled", false);
            }
            else {
                $(btn).addClass("clickable-disabled");
                $(btn).removeClass("clickable");
                $(btn).prop("disabled", true);
            }
        });
    });

    $("#password-confirm").on ("keyup", function () {
        var username = $("#ref-username").html ().trim ().toLowerCase ();
        var user = {
            username: $("#username-confirm").val (),
            password: $("#password-confirm").val ()
        };

        $.get ("/user/" + username + "/verify", user, function (result) {
            var btn = $("#delete-button");
            if (result) {
                $(btn).removeClass("clickable-disabled");
                $(btn).addClass("clickable");
                $(btn).prop("disabled", false);
            }
            else {
                $(btn).addClass("clickable-disabled");
                $(btn).removeClass("clickable");
                $(btn).prop("disabled", true);
            }
        });
    });
});