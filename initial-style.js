(function() {
    'use strict';

    window.InitialStyle = {
        /**
         * Get initial values for all CSS properties, as implemented by user agent.
         *
         * Will append an element in DOM, get the style data and then remove the element. This will cause a repaint,
         * but unlikely to have other side-effects, unless MutationObservers are observing that part of DOM.
         *
         * @param {Object=} options
         * @param {Node=} options.parentNode  A DOM node to which the dummy element will be appended. This DOM node
         *     should be attached to the document body or be the body itself. Default: document.body.
         * @return {Object.<string, string|number>}  An object that contains initial values of all CSS properties
         *     available to the user agent. Property names are CSS property names (in CSS formatting, with hyphens),
         *     property values are initial values.
         */
        get: function(options) {
            var settings = createSettings(options);
            var parentNode = settings.parentNode;
            var dummy = appendDummy(parentNode);
            var initialStyleAsPlainObject = cssStyleDeclarationToPlainObject(window.getComputedStyle(dummy));

            addExceptions(initialStyleAsPlainObject);
            parentNode.removeChild(dummy); // getComputedStyle() returns a live object in Chrome. Cache results before removing dummy.
            return initialStyleAsPlainObject;

            function createSettings(options) {
                options = options ? options : {};
                var settings = {
                    parentNode: typeof(options.parentNode) !== 'undefined' ? options.parentNode : document.body
                };

                if (typeof (settings.parentNode.appendChild) === 'undefined') {
                    throw new TypeError("parentNode doesn't implement appendChild");
                }
                return settings;
            }

            function appendDummy(parentNode) {
                var dummy = document.createElement('div');

                dummy.setAttribute('style', 'all: initial !important');
                parentNode.appendChild(dummy);
                return dummy;
            }

            function cssStyleDeclarationToPlainObject(declaration) {
                var result = {};

                for (var i = 0; i < declaration.length; i++) {
                    var propName = declaration.item(i);
                    result[propName] = declaration.getPropertyValue(propName);
                }
                return result;
            }

            function addExceptions(style) {
                var UNAFFECTED_BY_ALL_SHORTHAND = {
                    'direction': 'ltr',
                    'unicode-bidi': 'normal'
                };

                for (var propName in UNAFFECTED_BY_ALL_SHORTHAND) {
                    style[propName] = UNAFFECTED_BY_ALL_SHORTHAND[propName];
                }
            }
        }
    };
})();