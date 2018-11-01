'use strict';
/**
* @typedef options
* @type {Object}
* @property {HTMLElement} target The DOM Node to animate.
* @property {animation[]} animations An array of the properties that will be animated, see Animations. At least one property required.
* @property {number=} [defaultDuration=250] The default animation duration.
* @property {string=} [defaultEasing=linear] The default CSS easing type.
*/
/**
* @typedef animation
* @type {Object}
* @property {string} attribute The CSS Attribute to animate.
* @property {various} animateTo The value the element animates to.
* @property {number=} [duration=defaultDuration] The default CSS easing type.
* @property {string=} [easing=defaultEasing] The default CSS easing type.
* @property {boolean=} [pctDimension=false] The default CSS easing type.
*/
/**
 * Get a decimal value from a percentage string.
 * @function
 * @param {string} value - The percentage as string.
 * @returns {number} the percentage as decimal number.
 */
const getDecimalFromPercentage = value => parseFloat(value) / 100;
/**
 * Check if the provided string contains height.
 * @function
 * @param {string} value - The string to test.
 * @returns {boolean} the result as boolean.
 */
const checkIfHeight = value => value.indexOf('height') !== -1;
/**
 * Check if the provided string contains width.
 * @function
 * @param {string} value - The string to test.
 * @returns {boolean} the result as boolean.
 */
const checkIfWidth = value => value.indexOf('width') !== -1;
/**
 * Convert miliseconds to seconds and add a 's' at the end.
 * @function
 * @param {number} value - The number to convert
 * @returns {string} the result as string with a 's' at the end.
 */
const msToSeconds = value => `${value / 1000}s`;
/**
 * Converts the given percentage to pixel equvalent.
 * @function
 * @param {HTMLElement} domTarget The DOM Node to get the height and width from.
 * @param {string} attribute CSS attribute to check if it contains height or width.
 * @param {string} animateTo The string with the end percentage.
 * @returns {string} the result as string with 'px' added.
 */
const handlePercentage = (domTarget, attribute, animateTo) => {
    const checkedHeight = checkIfHeight(attribute);
    const checkedWidth = checkIfWidth(attribute);
    if (!checkedHeight && !checkedWidth) {
        throw new Error('Invalid direction');
    }
    const value = checkedHeight ?
        domTarget.scrollHeight :
        domTarget.scrollWidth;
    return `${value * getDecimalFromPercentage(animateTo)}px`;
};
/**
 * Entry point of the library
 *
 * @param {options} options The animation function
 */
 const Main = (options) => {
    const {
        target,
        animations,
        defaultDuration = 250,
        defaultEasing = 'linear',
    } = options;
    const transitions = [];
    const styles = [];
    animations.forEach((animation) => {
        const {
            attribute,
            pctDimension = false,
            duration = defaultDuration,
            easing = defaultEasing,
        } = animation;
        let {animateTo} = animation;

        animateTo = pctDimension ?
            handlePercentage(target, attribute, animateTo) :
            animateTo;

        styles.push({
            attribute,
            animateTo,
        });
        transitions.push(`${attribute} ${msToSeconds(duration)} ${easing}`);
    });
    target.style.transition = transitions.join();
    styles.forEach((style) => {
        target.style[style.attribute] = style.animateTo;
    });
};

module.exports = Main;
