function do_get(e) {
    shell = $(this).attr('data-shell');
    shell_error = $(this).attr('data-shell-error');

    callback_error = $(this).attr('data-callback-error');
    callback = $(this).attr('data-callback');
    url   = $(this).attr('data-show');

    $.ajax({
    url: url,  //Server script to process data
    type: 'GET',
    success: function(data) {
        eval(callback);
        $(shell).html(data);

    },
    error: function(data){
        eval(callback_error);
        $(shell_error).html(data.responseText);

    },
    cache: false,
    contentType: false,
    processData: false
    });
}

$(document).on('click', '.e-get', do_get);












