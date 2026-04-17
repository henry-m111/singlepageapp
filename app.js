const form = document.getElementById('search-form');
const wordInput = document.getElementById('word-input');
const results = document.getElementById('results');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  function displayResults(data) {
  const word = data.word;
  const phonetic = data.phonetic || 'No pronunciation available';
const audioUrl = data.phonetics.find(function(p) { return p.audio; });
  const meanings = data.meanings;

  let html = '<h2>' + word + '</h2>';
  html += '<p><em>' + phonetic + '</em></p>';

if (audioUrl) {
  html += '<audio controls src="' + audioUrl.audio + '"></audio>';
}

  meanings.forEach(function(meaning) {
    html += '<h3>' + meaning.partOfSpeech + '</h3>';
    const synonyms = meanings[0].synonyms;

if (synonyms && synonyms.length > 0) {
  html += '<h3>Synonyms</h3>';
  html += '<p>' + synonyms.slice(0, 5).join(', ') + '</p>';
}

    meaning.definitions.slice(0, 3).forEach(function(def) {
      html += '<p>• ' + def.definition + '</p>';

      if (def.example) {
        html += '<p><small>Example: ' + def.example + '</small></p>';
      }
    });
  });

  results.innerHTML = html;
}

  const word = wordInput.value.trim();

  if (word === '') {
    errorMessage.textContent = 'Please enter a word.';
    return;
  }

  errorMessage.textContent = '';
  results.innerHTML = '';

  fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + word)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Word not found');
      }
      return response.json();
    })
    .then(function(data) {
      displayResults(data[0]);;
    })
    .catch(function(error) {
  errorMessage.textContent = 'Word not found. Please try another word.';
  results.innerHTML = '';
});
    });
});