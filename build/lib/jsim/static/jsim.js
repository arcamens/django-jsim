function do_post(e) {
    $('#modalWait').modal('show');

    shell = $(this).attr('data-shell');
    shell_error = $(this).attr('data-shell-error');

    callback_error = $(this).attr('data-callback-error');
    callback = $(this).attr('data-callback');

    url   = $(this).attr('data-show');
    form  = $(this).attr('data-form');

    var formData = new FormData($(form)[0]);

    $.ajax({
    url: url,  //Server script to process data
    type: 'POST',

    success: function(data) {
    $('#modalWait').modal('hide');

    eval(callback);
    $(shell).html(data);
    $(document).on('click', '.e-post', do_post);
    },

    error: function(data){
    $('#modalWait').modal('hide');
    eval(callback_error);
    $(shell_error).html(data.responseText);
    $(document).on('click', '.e-post', do_post);
    },

    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    });

    $(document).off('click', '.e-post', do_post);
}


function do_get(e) {
    $('#modalWait').modal('show');

    shell = $(this).attr('data-shell');
    shell_error = $(this).attr('data-shell-error');

    callback_error = $(this).attr('data-callback-error');
    callback = $(this).attr('data-callback');
    url   = $(this).attr('data-show');

    if(shell_error == null && callback_error == null) {
        callback_error = "$('#modalError').modal('toggle');"
        shell_error = '#messageError';
    }

    $.ajax({
    url: url,  //Server script to process data
    type: 'GET',
    success: function(data) {
    $('#modalWait').modal('hide');
    eval(callback);
    $(shell).html(data);

    },
    error: function(data){
    $('#modalWait').modal('hide');
    eval(callback_error);
    $(shell_error).html(data.responseText);
    },
    cache: false,
    contentType: false,
    processData: false
    });
}

function mPostClose(e) {
    e.stopPropagation();
    e.preventDefault();
    $('#modalWait').modal('show');
    url = $(this).attr('href');
    shell = $(this).attr('data-shell');
    form  = $(this).attr('data-form');

    var formData = new FormData($(form)[0]);

    $.ajax({
    url: url,  //Server script to process data
    type: 'POST',

    success: function(data) {

    $(shell).html(data);
    $(e.target).closest('.modal').modal('hide');
    $('#modalWait').modal('hide');

    },

    error: function(data){
    $('#modalWait').modal('hide');
    $(e.target).closest('.modal-content').html(data.responseText);
    },

    data: formData,
    cache: false,
    contentType: false,
    processData: false
    });
}

function mPost(e) {
    e.stopPropagation();
    e.preventDefault();
    $('#modalWait').modal('show');

    url = $(this).attr('href');
    shell = $(this).attr('data-shell');
    form  = $(this).attr('data-form');

    if(shell == null) {
        shell = $(e.target).closest('.modal-content');
    }
    else {
        shell = $(shell);
    }

    var formData = new FormData($(form)[0]);

    $.ajax({
    url: url,  //Server script to process data
    type: 'POST',

    success: function(data) {
    shell.html(data);
    $('#modalWait').modal('hide');
    },

    error: function(data){
    shell.html(data.responseText);
    $('#modalWait').modal('hide');
    },

    data: formData,
    cache: false,
    contentType: false,
    processData: false
    });
}

function getModal(modal) {
    return function shell(e) {
    e.stopPropagation();
    e.preventDefault();
    $('#modalWait').modal('show');
    url = $(this).attr('href');

    $.ajax({
    url: url,  //Server script to process data
    type: 'GET',

    success: function(data) {
    $('#modalWait').modal('hide');
    $(modal).html(data);
    $(modal).closest('.modal').modal('show');
    },

    error: function(data){
    $('#modalWait').modal('hide');
    $('#modalError').html(data);
    $('#modalError').modal('show');
    },

    cache: false,
    contentType: false,
    processData: false
    });
    };
}

$(document).on('click', '.e-get', do_get);
$(document).on('click', '.e-post', do_post);
$(document).on('click', '.b-modal', getModal('#bigModalContent'));
$(document).on('click', '.s-modal', getModal('#modalContent'));
$(document).on('click', '.m-post-close', mPostClose);
$(document).on('click', '.m-post', mPost);



