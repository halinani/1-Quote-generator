const quoteBody = document.getElementById("quote-body");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const twitterBtn = document.getElementById("twitter-btn");
const newQuteBtn = document.getElementById("new-quote");

let listOfQuotes = [];

function newQuote() {
  const quote = listOfQuotes[Math.floor(Math.random() * listOfQuotes.length)];

  quoteAuthor.textContent = quote.author || "Unkonwn";

  // check the length of the text..btn-container

  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
}

async function getQuotes() {
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
console.log(listOfQuotes.length);

newQuteBtn.addEventListener("click", () => {
  newQuote();
});

twitterBtn.addEventListener("click", () => {
  const twitterurl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} __ ${quoteAuthor.textContent}`;
  window.open(twitterurl, "_blank");
});