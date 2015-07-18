(function() {
    'use strict';

    window.InitialStyle = {
        /**
         * Get initial values for all CSS properties, as implemented by user agent. Adds 'px' to length values (for
         * example, value of margin-top will be 0px, not 0).
         *
         * Will append an element in DOM, get the style data and then remove the element. This will cause a repaint,
         * but unlikely to have other side-effects, unless MutationObservers are observing that part of DOM.
         *
         * @param {Object=} options
         * @param {Node=} options.parentNode  A DOM node to which the dummy element will be appended. This DOM node
         *     should be attached to the document body or be the body itself. Default: document.body.
         * @return {Object.<string, string|number>}  An object that contains computed initial values of all CSS
         *     properties available to the user agent. Property names are CSS property names (in CSS formatting, with
         *     hyphens), property values are computed initial values.
         */
        get: function(options) {
            var settings = createSettings(options);
            var initialStyleAsPlainObject;

            doWithDummyElement(settings.parentNode, function(dummy) {
                initialStyleAsPlainObject = cssStyleDeclarationToPlainObject(window.getComputedStyle(dummy));
            });
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

            function doWithDummyElement(parentNode, callback) {
                var dummy = document.createElement('div');

                dummy.setAttribute('style', getStyle());
                parentNode.appendChild(dummy);
                callback(dummy);
                parentNode.removeChild(dummy);

                function getStyle() {
                    var INITIAL_STYLE = {
                        'all': 'initial',

                        // unaffected by `all` shorthand
                        'direction': 'ltr',
                        'unicode-bidi': 'normal'
                    };
                    var styleString = '';

                    for (var propName in INITIAL_STYLE) {
                        styleString += propName + ': ' + INITIAL_STYLE[propName] + ' !important; ';
                    }
                    return styleString;
                }
            }

            function cssStyleDeclarationToPlainObject(declaration) {
                var result = {};

                for (var i = 0; i < declaration.length; i++) {
                    var propName = declaration.item(i);
                    result[propName] = declaration.getPropertyValue(propName);
                }
                return result;
            }
        }
    };
})();