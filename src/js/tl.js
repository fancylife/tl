var $body = $('body');
var doc = window.document;
import modal from './modal.js';
$.fn.extend({
    tlNotice(content, _speed) {
        var speed = _speed || 1000;
        var docHeight = doc.documentElement.clientHeight;
        var docScrollTop = doc.body.scrollTop;
        var docWidth = doc.documentElement.clientWidth;
        var $el = $('<div class="t__notice">' + content + '</div>').appendTo($body);
        $el.css({
            "top": (docHeight - $el.height()) / 2 + docScrollTop,
            "left": (docWidth - $el.width()) / 2
        });
        $el.animate({
            opacity: '0.25',
            top: '-=50'
        }, speed, function() {
            $el.remove();
        });
    },
    tlModal(opts = {}) { //遮罩层
        modal.open(opts);
    },
    tlPopover(opts = {}) { //名片
        var content = opts.content;
        var width = opts.width || 300;
        var height = opts.height || 200;
        var placement = opts.placement || 'bottom-left';
        var $el = $("<div class='t__popover'>" + content + "</div>").appendTo($body);
        $el.css({
            width: width,
            height: height
        });
        $el.addClass('bottom-left');
        var $trigger = this;;
        var position = function($trigger) {
            var triggerOffset = $trigger.offset();
            var opts = {
                left: triggerOffset.left + $trigger.outerWidth() / 2 - $el.outerWidth() / 2,
                top: triggerOffset.top + $trigger.height() + 20
            };
            if (placement === 'bottom-left') {
                opts.left = triggerOffset.left;
            }
            if (placement === 'bottom-right') {
                opts.left = triggerOffset.left - $el.outerWidth();
            }
            $el.css(opts);
        };

        return {
            show() {
                position($trigger);
                $el.fadeIn("slow");
            },
            remove() {
                $(".t__popover").remove();

            }
        }
    }
});