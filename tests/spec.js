jasmine.getFixtures().fixturesPath = 'base/tests/';

describe("Initial style values ", function() {
    'use strict';

    it("Should return a map where keys are CSS property names and values are corresponding initial values", function() {
        loadFixtures('single.html');
        expect(checkResult(InitialStyle.get(), getReferenceComputedStyle())).toBe(true);
    });

    it("Should create a dummy element with the passed tag name", function(done) {
        loadFixtures('single.html');

        var tagName = 'ul';
        createMutationObserver(done, function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    expect(mutations[0].addedNodes[0].tagName.toUpperCase()).toBe(tagName.toUpperCase());
                }
            });
        });
        InitialStyle.get({tagName: tagName});
    });

    it("Should create a dummy element in the specified container node", function(done) {
        loadFixtures('container.html');

        var parentNode = $('#one')[0];
        createMutationObserver(done, function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length > 0) {
                    expect(mutations[0].target).toBe(parentNode);
                }
            });
        });
        InitialStyle.get({parentNode: parentNode});
    });

    it("Unicode-bidi and direction properties should be taken into account", function() {
        loadFixtures('exceptions.html');
        expect(checkResult(InitialStyle.get({tagName: 'span'}), getReferenceComputedStyle())).toBe(true);
    });

    it("Element selectors with high specificity in CSS should not affect the result", function() {
        loadFixtures('css.html');
        expect(checkResult(InitialStyle.get({tagName: 'span'}), getReferenceComputedStyle())).toBe(true);
    });

    it("Body child count should remain the same", function() {
        loadFixtures('single.html');

        var childrenBefore = getBodyChildrenLength();
        InitialStyle.get({tagName: 'span'});
        var childrenAfter = getBodyChildrenLength();
        expect(childrenBefore).toEqual(childrenAfter);

        function getBodyChildrenLength() {
            return document.body.children.length;
        }
    });

    function createMutationObserver(done, expectCallback) {
        var obs = new MutationObserver(function(mutations) {
            expectCallback(mutations);
            obs.disconnect();
            done();
        });

        obs.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    function getReferenceComputedStyle() {
        return window.getComputedStyle($('#reference')[0]);
    }

    /**
     * @param {Object} result
     * @param {CSSStyleDeclaration} declaration
     */
    function checkResult(result, declaration) {
        for (var i = 0; i < declaration.length; i++) {
            var propName = declaration[i];
            if (declaration.getPropertyValue(propName) !== result[propName]) {
                logFailure(result, declaration, propName);
                return false;
            }
        }
        for (var resultPropName in result) {
            if (declaration.getPropertyValue(resultPropName) !== result[resultPropName]) {
                logFailure(result, declaration, resultPropName);
                return false;
            }
        }
        return true;

        function logFailure(result, declaration, propName) {
            console.error('Property value mismatch', propName, 'reference: ' + declaration.getPropertyValue(propName), 'result: ' + result[propName]);
        }
    }
});