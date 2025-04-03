async function searchWord() {
    const word = document.getElementById("wordInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (word === "") {
        resultDiv.innerHTML = "<p class='error'>Please enter a word!</p>";
        return;
    }

    resultDiv.innerHTML = "<p class='loading'>Searching...</p>";

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        if (response.ok) {
            const meaning = data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found.";
            const pronunciation = data[0]?.phonetics[0]?.text || "Not available";
            const audioUrl = data[0]?.phonetics[0]?.audio || "";

            resultDiv.innerHTML = `
                <div class="word-info">
                    <h2>${word}</h2>
                    <p class="pronunciation">${pronunciation}</p>
                    ${audioUrl ? `<button class="play-btn" onclick="playAudio('${audioUrl}')">🔊</button>` : ""}
                </div>
                <p class="definition">${meaning}</p>
            `;
        } else {
            resultDiv.innerHTML = `<p class="error">Word not found. Try another word!</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">Error fetching data. Try again!</p>`;
    }
}

// Play Pronunciation
function playAudio(url) {
    new Audio(url).play();
}
