const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get('recipeId');

if (recipeId) {
    
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];
        const title = document.getElementById('meal-title');
        title.innerHTML = meal.strMeal;

        const link = document.getElementById('youtube-link');
        link.href = meal.strYoutube;

        const img = document.getElementById('player-img');
        img.src = meal.strMealThumb;

        let ingrediantsCount = 0;
        const ul = document.getElementById('Ingredients-measure');
        for (let i = 1; i<=20; i++){
            if (meal['strIngredient'+ i]){
                // console.log(meal['strIngredient'+ i]);
                
                const li =document.createElement('li');
                li.innerHTML = meal['strMeasure'+i]+" "+ meal['strIngredient'+ i];

                ul.appendChild(li);

                ingrediantsCount++;
            }
            else
            {
                break;
            }
        }

        const count = document.getElementById('ingredients-count');
        count.innerHTML = ingrediantsCount;

        console.log(data);
       
    })
    .catch(error => {
        console.error('Error fetching recipe from API:', error);
    });
}



