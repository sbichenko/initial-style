# initial-style.js

Compute initial values for all CSS and SVG properties, as implemented by user agent. Ignores `perspective-origin` and `transform-origin` properties. Designed primarily for use in extensions.

Works in Chrome and Firefox: [![Build Status](https://travis-ci.org/sbichenko/initial-style.svg)](https://travis-ci.org/sbichenko/initial-style)

## Install

### Bower

`bower install initial-style`

### Without bower

Simply include the `initial-style.js` file, as it has no dependencies.

## Usage

Call:

`var initialStyles = InitialStyle.get(options)`

Result:

```
{
    animation-delay:'0s',
    animation-direction:'normal',
    animation-duration:'0s',
    animation-fill-mode:'none',
    animation-iteration-count:'1',
    animation-name:'none',
    ...
    x:'0px',
    y:'0px',
    r:'0px',
    rx:'0px',
    ry:'0px'
}
```

## Options

`parentNode` - A DOM node to which the dummy element, that is used to calculate style, will be appended. This DOM node should be attached to the document body or be the body itself. Default: `document.body`.

## Participation

I will gladly accept pull requests if the tests are provided.