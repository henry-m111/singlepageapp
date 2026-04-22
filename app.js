const form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  searchWord();
});

function searchWord() {
  const word = document.getElementById("wordInput").value.trim();

  const errorEl = document.getElementById("error");
  const wordEl = document.getElementById("word");
  const posEl = document.getElementById("partOfSpeech");
  const defEl = document.getElementById("definition");
  const exEl = document.getElementById("example");
  const synEl = document.getElementById("synonyms");
  const audioEl = document.getElementById("audio");


  errorEl.textContent = "";
  wordEl.textContent = "";
  posEl.textContent = "";
  defEl.textContent = "";
  exEl.textContent = "";
  synEl.textContent = "";
  audioEl.src = "";

  if (word === "") {
    errorEl.textContent = "Please enter a word.";
    return;
  }

  
  errorEl.textContent = "Loading...";

  fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then(response => {
      if (!response.ok) {
        throw new Error("Word not found");
      }
      return response.json();
    })
    .then(data => {
      errorEl.textContent = "";

      const info = data[0];

      const meaning = info.meanings?.[0];
      const definition = meaning?.definitions?.[0];

      wordEl.textContent = info.word || "N/A";
      posEl.textContent = "Part of Speech: " + (meaning?.partOfSpeech || "N/A");
      defEl.textContent = "Definition: " + (definition?.definition || "N/A");
      exEl.textContent = "Example: " + (definition?.example || "No example available");

      const synonyms = meaning?.synonyms || [];
      synEl.textContent = "Synonyms: " + (synonyms.length ? synonyms.join(", ") : "None");

      const audio = info.phonetics?.find(p => p.audio)?.audio;
      if (audio) {
        audioEl.src = audio;
      }

      document.body.style.backgroundColor = "#e6f7ff";
    })
    .catch(error => {
      errorEl.textContent = error.message;
    });
}