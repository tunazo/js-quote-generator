const URL = "https://type.fit/api/quotes";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteButton = document.getElementById("new-quote");
const tweetButton = document.getElementById("tweet");
const loader = document.getElementById("loader");

let quoteStore = [];

async function getQuote() {
  loading();
  try {
    const response = await fetch(URL);
    quoteStore = await response.json();
    setQuote();
  } catch (error) {
    console.log(error);
  }
}

function setQuote() {
  loading();
  const quote = quoteStore[Math.floor(Math.random() * quoteStore.length)];

  quoteText.classList.toggle("long-quote", quote.text.length > 100);
  quoteText.textContent = quote.text;

  quoteAuthor.textContent = quote.author ?? "Unknown";
  loading(false);
}

function tweetQuote() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}`;
  window.open(tweetUrl, "_blank");
}

function loading(status = true) {
  [quoteContainer.hidden, loader.hidden] = status
    ? [true, false]
    : [false, true];
}

newQuoteButton.addEventListener("click", setQuote);
tweetButton.addEventListener("click", tweetQuote);

//get quote onload
getQuote();
