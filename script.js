const form = document.getElementById("searchForm");
const input = document.getElementById("wordInput");
const result = document.getElementById("result");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const word = input.value.trim();

  if (!word) {
    showError("Please enter a word.");
    return;
  }

  fetchWord(word);
});

function fetchWord(word) {
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Word not found");
      }
      return res.json();
    })
    .then(data => displayResult(data))
    .catch(err => showError(err.message));
}

function displayResult(data) {
  const wordData = data[0];

  const word = wordData.word;
  const phonetic = wordData.phonetic || "N/A";
  const meaning = wordData.meanings[0];
  const definition = meaning.definitions[0].definition;
  const example = meaning.definitions[0].example || "No example available.";
  const synonyms = meaning.synonyms?.join(", ") || "None";

  const audio = wordData.phonetics.find(p => p.audio)?.audio;

  result.innerHTML = `
    <div class="result-card">
      <h2>${word}</h2>
      <p><strong>Pronunciation:</strong> ${phonetic}</p>
      <p><strong>Definition:</strong> ${definition}</p>
      <p><strong>Example:</strong> ${example}</p>
      <p><strong>Synonyms:</strong> ${synonyms}</p>
      ${
        audio 
        ? `<audio controls src="${audio}"></audio>` 
        : "<p>No audio available</p>"
      }
    </div>
  `;
}

function showError(message) {
  result.innerHTML = `<p class="error">${message}</p>`;
}