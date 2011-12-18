// Voormedia Emailifier jQuery Plugin
// Copyright (c) 2011 Voormedia B.V.
// Released under the MIT license.

(function($) {
    $.emailify = {

        settings: {
            atSign: " [at] ",
            // String that will be replaced by '@'.
            dotSign: " [dot] ",
            // String that will be replaced by '.'.
            substitute: function(email) {
                return (this.constructLink(email));
            }
            // Function that returns the substitute string.
        },

        initialize: function(options) {
            this.settings.substitute = this.constructLink;
            this.settings = $.extend({}, this.settings, options);
            return this;
        },

        deobfuscate: function() {
            this.deobfuscated =
            this.html().replace(this.settings.atSign, "@").replace(this.settings.dotSign, ".");
            return (this);
        },

        construct: function() {
            this.substitution = this.settings.substitute(this.deobfuscated);
            return (this);
        },

        substitute: function() {
            this.html(this.substitution);
            return (this);
        },

        constructLink: function(deobfuscated) {
            return (
            $("<a>", {
                href: "mailto:" + deobfuscated,
                text: deobfuscated
            }));
        }

    }

    $.fn.emailify = function(options) {
        this.each(function() {
            $(this).extend($.emailify).initialize(options).deobfuscate().construct().substitute();
        });
    }

})(jQuery);