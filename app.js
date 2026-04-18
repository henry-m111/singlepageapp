const button = document.getElementById("searchBtn");

button.addEventListener("click", searchWord);

function searchWord() {
  const word = document.getElementById("wordInput").value.trim();

  // Clear old messages
  document.getElementById("error").textContent = "";

  if (word === "") {
    document.getElementById("error").textContent = "Please enter a word.";
    return;
  }

  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(data => {
      const info = data[0];

      const meaning = info.meanings[0];
      const definition = meaning.definitions[0];

      document.getElementById("word").textContent = info.word;
      document.getElementById("partOfSpeech").textContent =
        "Part of Speech: " + meaning.partOfSpeech;

      document.getElementById("definition").textContent =
        "Definition: " + definition.definition;

      document.getElementById("example").textContent =
        "Example: " + (definition.example || "No example available");
    })
    .catch(error => {
      document.getElementById("error").textContent = error.message;

      // Clear results if error
      document.getElementById("word").textContent = "";
      document.getElementById("partOfSpeech").textContent = "";
      document.getElementById("definition").textContent = "";
      document.getElementById("example").textContent = "";
    });
}