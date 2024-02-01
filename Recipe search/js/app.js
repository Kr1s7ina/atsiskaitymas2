
getCategories();

function getCategories(){
    fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
    .then(response => response.json())
    .then(data => {

        const categoriesDiv = document.getElementById('categories');

        data.meals.forEach(cat => {
            const categoryButton = document.createElement('button');
            categoryButton.className = "btn btn-primary";
            categoryButton.role = "button";
            categoryButton.innerHTML = cat.strCategory;

            categoryButton.addEventListener('click', function () {
                filterRecipes(cat.strCategory);
            });

            categoriesDiv.appendChild(categoryButton);
        })
    })
    .catch(error => {
        console.error('Error fetching categories from API:', error);
    });
}


const form = document.getElementById('receipes-form');
const cardsContainer = document.getElementById('cards-container');
const buttons = document.querySelectorAll('.recipe-groups .btn');

form.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = this.querySelector('.recipe-search').value;
    searchRecipes(searchTerm);
});

buttons.forEach(button => {
    button.addEventListener('click', function () {
        const category = this.textContent.trim();
        filterRecipes(category);
    });
});


function searchRecipes(searchTerm) {
    // Valyti senus rezultatus
    cardsContainer.innerHTML = '';

    // Gauti receptus iš API
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        .then(response => response.json())
        .then(data => {
            showMeals(data);
        })
        .catch(error => {
            console.error('Error fetching recipes from API:', error);
            cardsContainer.innerHTML = '<p>Error fetching recipes.</p>';
        });
}

function filterRecipes(category) {
    // Valyti senus rezultatus
    cardsContainer.innerHTML = '';
    document.querySelector('.recipe-search').value = "";

    // Gauti receptus iš API
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => response.json())
        .then(data => {
            showMeals(data);
        })
        .catch(error => {
            console.error('Error fetching recipes from API:', error);
            cardsContainer.innerHTML = '<p>Error fetching recipes.</p>';
        });
}

function showMeals(data){
    if (data.meals) {
        // Atvaizduoti kiekvieną receptą
        data.meals.forEach(recipe => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('card-wrapper', 'm-4');

            recipeDiv.innerHTML = `
                <div class="card" style="width: 24rem;">
                    <img src="${recipe.strMealThumb}" class="card-img-top position-relative" alt="${recipe.strMeal}">
                    <div class="position-absolute heart"></div>
                    <div class="card-body">
                        <div class="row">
                            <a href="recipe.html?recipeId=${recipe.idMeal}"><h3 class="card-text col-9">${recipe.strMeal}</h3></a>
                        </div>
                    </div>
                </div>
            `;

            cardsContainer.appendChild(recipeDiv);
        });
    } else {
        cardsContainer.innerHTML = '<p>No recipes found.</p>';
    }
}
