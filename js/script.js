/**
 * A random quote generator.
 */

/**
 * Array to store the quotes.
 * @type {*[]}
 */
const quotes = [
    {
        quote: "Don't cry because it's over, smile because it happened.",
        source: "Dr. Seuss",
        color: "#883677"
    },
    {
        quote: "Mama always said life was like a box of chocolates: You never know what you’re gonna get",
        source: "Forrest Gump",
        citation: "Forrest Gump",
        citationType: "Movie",
        link: "https://www.amazon.com/dp/B002QVZ71I?creativeASIN=B002QVZ71I&linkCode=w61&imprToken=mqT0TYRCL01f86m-t-i.2Q&slotNum=7&tag=readerwp-20",
        year: 1994,
        color: "#DB5461"
    },
    {
        quote: "Most people are nice when you finally see them.",
        source: "Harper Lee",
        citation: "To Kill a Mockingbird",
        citationType: "Book",
        link: "https://www.amazon.com/Kill-Mockingbird-Harperperennial-Modern-Classics-ebook/dp/B00K0OI42W/?tag=efly01-20",
        year: 2014,
        color: "#36B55C"
    },
    {
        quote: "All endings are also beginnings. We just don’t know it at the time.",
        source: "Mitch Albom",
        citation: "The Five People You Meet In Heaven",
        citationType: "Book",
        link: "https://www.amazon.com/Five-People-You-Meet-Heaven-ebook/dp/B002TXZQW8/?tag=efly01-20",
        year: 2009,
        color: "#FFBA49"
    },
    {
        quote: "Appear weak when you are strong, and strong when you are weak.",
        source: "Sun Tzu",
        citation: "The Art of War",
        citationType: "Book",
        color: "#5438DC"
    }
];

/**
 * Variable to hold the random generated number.
 */
let randomNumber;

/**
 * Get a random quote from the quotes array.
 * @returns {*}
 */
const getRandomQuote = () => {
    // Get a new random number based on the array length.
    let newRandomNumber = Math.floor(Math.random() * quotes.length);

    // I don't want to have the same quote generated twice in a row, so make sure the new random number is different from the previous one.
    while (randomNumber === newRandomNumber) {
        newRandomNumber = Math.floor(Math.random() * quotes.length);
    }

    randomNumber = newRandomNumber;

    // Return the quote object based on the random number as key.
    return quotes[randomNumber];
};

/**
 * Hold the setInterval Id
 * @type {number}
 */
let printQuoteIntervalId;

/**
 * Set an interval for the printQuote function. With this we can reset any interval previously set when calling the function again.
 */
const setQuoteInterval = () => {
    if (printQuoteIntervalId) {
        clearInterval(printQuoteIntervalId);
    }
    printQuoteIntervalId = setInterval(printQuote, 15000);
};

/**
 * Get a random quote and print it to the screen.
 */
const printQuote = () => {
    const randomQuote = getRandomQuote(); // Get the random quote.
    let output = ''; // Declare the variable that will hold the html string to be outputed.

    output += '<p class="quote">' + randomQuote.quote + '</p>';
    output += '<p class="source">' + randomQuote.source;

    // Check if there is a citation and add it to the output variable.
    if (randomQuote.citation) {
        // Create this variable to check if the citation type is defined and assign it, otherwise leave it empty.
        const citationType = randomQuote.citationType ? ' (' + randomQuote.citationType + ')' : '';

        output += '<span class="citation">';

        // Check if the citation has a link and add an anchor tag.
        if (randomQuote.link) {
            output += '<a href="' + randomQuote.link + '" target="_blank">' + randomQuote.citation + '</a>';
        } else {
            output += randomQuote.citation;
        }

        output += citationType + '</span>';
    }

    // Check if the year is set and add it.
    if (randomQuote.year) {
        output += '<span class="year">' + randomQuote.year + '</span>';
    }

    output += '</p>';

    // Print the quote and change the <body> background colour.
    document.querySelector('#quote-box').innerHTML = output;
    document.body.style.backgroundColor = randomQuote.color;

    // Call the function to set an interval.
    setQuoteInterval();
};

/**
 * Call the printQuote function to start the page with a random quote.
 */
printQuote();

/**
 * When clicking the "Show another quote" button generate and print another quote.
 */
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

