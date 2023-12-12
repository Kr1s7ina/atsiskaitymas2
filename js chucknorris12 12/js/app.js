document.addEventListener("DOMContentLoaded", function () {
    function getJokesByWord(word) {
        fetch(`https://api.chucknorris.io/jokes/search?query=${word}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.result && data.result.length > 0) {
                    const jokeContainer = document.getElementById("joke-container");
                    jokeContainer.innerHTML = '';

                    data.result.forEach(joke => {
                        const cardElement = createJokeCard(joke.value);
                        jokeContainer.appendChild(cardElement);
                    });
                } else {
                    const jokeContainer = document.getElementById("joke-container");
                    jokeContainer.innerHTML = '<p>Nieko nerasta.</p>';
                }
            })
            .catch(error => console.error("Error fetching jokes:", error));
    }

    document.getElementById("search-input").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const searchInput = document.getElementById("search-input");
            const searchWord = searchInput.value.trim();
            if (searchWord !== "") {
                getJokesByWord(searchWord);
            }
        }
    });

    function createJokeCard(jokeText) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card", "m-2");
        cardElement.style.width = "24rem";

        const randomColor = getRandomColor();
        cardElement.style.backgroundColor = randomColor;

        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        const jokeTextElement = document.createElement("p");
        jokeTextElement.classList.add("card-text");
        jokeTextElement.innerText = jokeText;

        cardBody.appendChild(jokeTextElement);
        cardElement.appendChild(cardBody);

        return cardElement;
    }

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});
