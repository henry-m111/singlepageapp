document.getElementById('search-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const word = document.getElementById('word-input').value.trim();
  if (!word) {
    alert('Please enter a word!');
    return;
  }

  getWordInfo(word);
});

async function getWordInfo(word) {
  const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.title === 'No Definitions Found') {
      showError(word);
      return;
    }

    showResults(data[0]);
  } catch (err) {
    showError(word);
  }
}

function showResults(wordData) {
  const container = document.getElementById('result-container');

  const word = wordData.word;
  const phonetic = wordData.phonetic || '';

  const meaning = wordData.meanings[0];
  const partOfSpeech = meaning.partOfSpeech;

  const definitionObj = meaning.definitions[0];
  const definition = definitionObj.definition;
  const example = definitionObj.example || '';

  const synonyms = meaning.synonyms || [];

  let audioUrl = '';
  for (let i = 0; i < (wordData.phonetics || []).length; i++) {
    const audioCandidate = wordData.phonetics[i].audio;
    if (audioCandidate) {
      audioUrl = audioCandidate;
      break;
    }
  }

  let html = '<div class="word-card">';
  html += '<h2>' + word + '</h2>';

  if (phonetic) {
    html += '<p class="phonetic">' + phonetic + '</p>';
  }

  if (audioUrl) {
    html += '<button class="audio-btn" onclick="playAudio(\'' + audioUrl + '\')">▶ Listen</button>';
  }

  html += '<p class="part-of-speech">' + partOfSpeech + '</p>';
  html += '<p class="definition">' + definition + '</p>';

  if (example) {
    html += '<p class="example">"' + example + '"</p>';
  }

  if (synonyms.length > 0) {
    html += '<p class="synonyms"><strong>Synonyms:</strong> ' + synonyms.slice(0, 5).join(', ') + '</p>';
  }

  html += '</div>';

  container.innerHTML = html;
}

function showError(word) {
  const container = document.getElementById('result-container');
  container.innerHTML =
    '<div class="error-message">Oops! We couldn\'t find "' +
    word +
    '". Try another word.</div>';
}

function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}