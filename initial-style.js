(function() {
    'use strict';

    window.InitialStyle = {
        /**
         * Compute initial values for all CSS and SVG properties, as implemented by user agent. Ignores
         * `perspective-origin` and `transform-origin` properties.
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

            doWithTempElement(settings.parentNode, function(tempElement) {
                tempElement.setAttribute('style', getInitialStyleReset());
                initialStyleAsPlainObject = cssStyleDeclarationToPlainObject(window.getComputedStyle(tempElement));
                removeOriginProperties(initialStyleAsPlainObject);
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

            function doWithTempElement(parentNode, callback) {
                var tempElement = document.createElement('div');

                parentNode.appendChild(tempElement);
                callback(tempElement);
                parentNode.removeChild(tempElement);
            }

            function getInitialStyleReset() {
                var INITIAL_STYLE = {
                    'all': 'initial',
                    // unaffected by `all` shorthand:
                    'direction': 'ltr',
                    'unicode-bidi': 'normal'
                };

                return Object.keys(INITIAL_STYLE).reduce(function(prev, propName) {
                    return prev + propName + ': ' + INITIAL_STYLE[propName] + ' !important; ';
                }, '');
            }

            function cssStyleDeclarationToPlainObject(declaration) {
                var result = {};

                for (var i = 0; i < declaration.length; i++) {
                    var propName = declaration.item(i);
                    result[propName] = declaration.getPropertyValue(propName);
                }
                return result;
            }

            function removeOriginProperties(style) {
                var ORIGIN_PROPERTIES = ['perspective-origin', '-webkit-perspective-origin', 'transform-origin', '-webkit-transform-origin'];

                ORIGIN_PROPERTIES.forEach(function(propName) {
                    delete style[propName];
                });
            }
        }
    };
})();