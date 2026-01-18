var formatBlock = function() {
    return {
        message: 'Please Wait <img style="display:inline;width:20px;height:20px;">',
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff'
        }
    };
}

var loadFirst = function() {
    setTimeout(function() {
        $('#loader').addClass('hidden');
    }, 400);
};


var checkSession = function() {
    $.get('php/checksession.php', function(data) {
        var sessiondata = $.parseJSON(data);
        if (sessiondata.isSuccess) {
            $(location).attr('href', 'dashboard.html');
        } else {
            loadFirst();
        }
    });
};

var handleFormEvents = function() {
    $.validate({
        form: '#frmLogin',
        modules: 'security'
    });
};

var onLogin = function() {
    $("#frmLogin").submit(function(e) {
        e.preventDefault();
        $('#login').block(formatBlock());
        var loginObj = $("#frmLogin").serializeArray();

        $.post('php/loginStudent.php', loginObj, function(data) {
            if (data.isSuccess) {
                // Store the user's name locally
                localStorage.setItem('fname', data.fname);

                // Redirect to dashboard
                $(location).attr('href', 'dashboard.html');
            } else {
                var alert = `
                    <div class='alert alert-danger'>
                        <a href='#' class='close' data-dismiss='alert'>&times;</a>
                        ${data.msg}
                    </div>`;
                $("#admin-msg").html(alert);
            }
            $('#login').unblock();
        }, 'json');
    });
};



var Login = function() {
    "use strict";

    return {
        init: function() {
            checkSession(),
                handleFormEvents(),
                onLogin()

            // btnForgotPass(),
            // cancel(),
            // onForgotPass()
        }
    }
}()

console.log('login.js loaded');
console.log(Login.init);