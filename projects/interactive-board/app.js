/**
 * Interactive Sensory Grid
 * A demonstration of dynamic DOM generation and event handling.
 */

const board = document.querySelector('#board');

// Modern vibrant color palette
const colors = ['#38bdf8', '#fb7185', '#34d399', '#fbbf24', '#a78bfa', '#f472b6'];

// Number of squares to generate
const SQUARES_NUMBER = 324;

// Initialize the grid
for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div');
    square.classList.add('square');

    // Add interaction listeners
    square.addEventListener('mouseover', () => setColor(square));
    square.addEventListener('mouseleave', () => removeColor(square));

    board.append(square);
}

/**
 * Applies a random color and glow effect to the element
 * @param {HTMLElement} element 
 */
function setColor(element) {
    const color = getRandomColor();
    element.style.backgroundColor = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}

/**
 * Removes the color and resets the element to its base state
 * @param {HTMLElement} element 
 */
function removeColor(element) {
    element.style.backgroundColor = '#1e293b';
    element.style.boxShadow = `0 0 2px #000`;
}

/**
 * Helper: Returns a random color from the palette
 * @returns {string} color
 */
function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}