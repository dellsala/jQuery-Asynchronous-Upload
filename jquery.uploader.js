(function ($) {


    $.fn.uploader = function (options) {
    
        this.each(function (index) {

            var uploaderOptions = $.extend({}, options);
            uploaderOptions.buttonElement = this;
            new Uploader(uploaderOptions);
        
        });
    
    }


    function Uploader (options) {

        var that = this;

        this.options = $.extend({}, {
            url : 'upload.php',
            buttonElement : null,
            inputName : 'ajax_file',
            data : {},
            onStart : function () {},
            onComplete : function (response) {}
        }, options);
    
        this.id = ((new Date()).getTime());
        this.$button = $(this.options.buttonElement);


        // assemble upload form/frame mechanics

        this.$form = $('<form id="uploader_form_'+this.id+
            '" action="'+this.options.url+'" method="post" '+
            'enctype="multipart/form-data" target="uploader_frame_'+this.id+
            '"></form>');
            
        this.$frame = $('<iframe name="uploader_frame_' + this.id + '" src="about:blank" \/>');
        this.$frame.css("display", "none");

        this.$input = $('<input type="file" name="'+this.options.inputName+'">');
        this.$input.on('change', function () {
            this.form.submit();
            that.$input.attr('disabled', 'disabled');
            that.options.onStart.call(that);
        });
        
        for (var key in this.options.data) {
            this.$form.append('<input type="hidden" name="'+key+'" name="'+key+'" value="'+this.options.data[key]+'"/>');
        }

        // position upload over button

        function repositionForm () {
            var buttonOffset = that.$button.offset();
            that.$form
                .width(that.$button.outerWidth())
                .height(that.$button.outerHeight())
                .css({
                    overflow : 'hidden',
                    position : 'absolute',
                    top : buttonOffset.top+'px',
                    left : buttonOffset.left+'px',
                    opacity: '0'
                });
        }
        repositionForm();
        
        this.$button.on('hover', repositionForm);

        this.$input.css({
            fontSize : (this.$button.outerHeight() + 20) + 'px',
            cursor: 'pointer'
        });

        // attach to document

        this.$form.append(this.$input);
        $('body').append(this.$form).append(this.$frame);

        this.$frame.on('load', function (e) {
            var $body = $(window.frames['uploader_frame_'+that.id].document.getElementsByTagName('body')[0]);
            that.options.onComplete.call(that, $body.html());
            that.$input.removeAttr('disabled');
            that.$form.get(0).reset();
        });
        
    }

})(jQuery);