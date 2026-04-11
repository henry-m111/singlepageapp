// Task 1: Define the Problem
// 1. User Features
// Feature 1 – Word Search
// The first thing I wanted the app to do is let users search for any word they want. You type a word into the search bar and either click the Search button or just hit Enter. The app then goes and fetches the definition from the API and shows everything on the same page — no reloading. If the word doesn't exist or there's a typo, the app shows a friendly error message so the user knows what went wrong.
// Feature 2 – Pronunciation, Definitions & Synonyms
// Once a word is found, I wanted to show more than just the definition. The app displays:

// The word and how it's pronounced phonetically, for example ephemeral shows as /ɪˈfɛm(ə)r(ə)l/
// Definitions grouped by part of speech, so if a word is both a noun and a verb, those are shown separately
// Example sentences where the API has them, so users can see the word used in context
// Synonyms shown as clickable tags — clicking one automatically searches that word, which I thought was a nice touch for a language learning app

// Feature 3 – Audio Playback
// I also added audio pronunciation. If the API returns an audio file for the word, a Pronounce button appears on the page. Clicking it plays the word out loud directly in the browser. I used the browser's built-in Audio object for this so no extra libraries or plugins are needed.