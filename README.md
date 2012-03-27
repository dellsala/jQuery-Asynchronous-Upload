jQuery Asynchronous Upload Plugin
=================================

What is it?
----------
Turns an element into an asynchronous file upload trigger.

* bare-bones ajax file upload functionality
* no built-in ui (other than a required trigger element)
* hooks for attaching your own ui interactions
* fully customizable server-side response handling/formatting
* html4 iframe implementation only (no progress reporting)
* single file upload per trigger


How to Use it
-------------

###HTML
    <input type="button" id="myUploadButton" value="Upload a File">

###JavaScript

    $(function () {
     
        $('#myUploadButton').uploader({
            url : '/some-upload-handler.php',
            inputName : 'my_upload_file', 
            onStart : function () {
                $('body').append('Upload started...');
            },
            onComplete : function (response) {
                $('body').append('Upload finished. Response: '+response);
            }
        });
     
    });



