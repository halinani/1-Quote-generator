const quoteContainer = document.getElementById("quote-container");
const quoteBody = document.getElementById("quote-body");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const twitterBtn = document.getElementById("twitter-btn");
const newQuteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

let listOfQuotes = [];

function newQuote() {
  loading();
  const quote = listOfQuotes[Math.floor(Math.random() * listOfQuotes.length)];

  quoteAuthor.textContent = quote.author || "Unkonwn";

  // check the length of the text..btn-container

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
  loading();
  try {
    const url = "https://type.fit/api/quotes";
    const quotes = await fetch(url);
    listOfQuotes = await quotes.json();
    console.log(listOfQuotes.length);
    newQuote();
  } catch (error) {
    alert(error);
  }
}

getQuotes();

function sendTweet() {
  const twitterurl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} __ ${quoteAuthor.textContent}`;
  window.open(twitterurl, "_blank");
}

newQuteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", sendTweet);

loading();
