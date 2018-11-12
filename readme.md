
# simple-animation-js

> Simple animation library which uses CSS transitions in the background and allows animating dimension percentages with scrollWidth and scrollHeight.

## Installation

    npm install simple-animation-js

## Documentation

The documentation is found under [this link](https://competec.github.io/simple-animation-js) or in the `gh-pages` branch.
The starting point of the documentation is the Module `simpleAnimation`.

## Contributen

If you want to contribute to this project please commit with the `npm run commit` command, this will secure the automatic semantic versioning. 

## Example

const simpleAnimationJs = require('simpleAnimationJs');
const elementToAnimate = document.getElementById('testDiv');
const options = {
	target: elementToAnimate,
	animations: [{
		attribute: 'height',
		animateTo: '100%',
		duration: 400,
		easing: 'ease-in',
		pctToScroll: true
	},
	{
		attribute: 'opacity',
		animateTo: 1
	}],
	defaultDuration: 350,
	defaultEasing: 'ease-out
	'
};
simpleAnimationJs(options);
