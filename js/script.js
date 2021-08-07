const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
const jokeText = document.getElementById("joke-text");

// Disable / Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
}
// Passing Joke to VoiceRSS API
function tellme(joke) {
  const jokeString = joke.trim().replace(/ /g, "%20");
  VoiceRSS.speech({
    key: "83e66ec2d2b14869aa6c3c70391f8f82",
    src: jokeString,
    hl: "en-us",
    v: "Mary",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    // Text-to-Speech
    tellme(joke);
    jokeText.innerText = joke;
    console.log(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch an Error
    console.log("the Error is :", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
