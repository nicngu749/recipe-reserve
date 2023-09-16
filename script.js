// script.js

const edamamAppId = '67bb73bd'; // Edamam App ID
const edamamAppKey = 'a3f1f84da3baadbe2f2d761b40629ab9'; // Edamam App Key
const searchBtn = document.getElementById('searchBtn');
const ingredientsInput = document.getElementById('ingredients');
const recipeResults = document.getElementById('recipeResults');

searchBtn.addEventListener('click', () => {
    const userIngredients = ingredientsInput.value.toLowerCase(); // Convert input to lowercase
    let apiUrl;

    if (userIngredients.includes('vegan')) {
        // If the input contains "vegan," include health=vegan in the API request
        apiUrl = `https://api.edamam.com/search?q=${userIngredients}&app_id=${edamamAppId}&app_key=${edamamAppKey}&health=vegan`;
    } else {
        // Otherwise, make a regular API request without the health parameter
        apiUrl = `https://api.edamam.com/search?q=${userIngredients}&app_id=${edamamAppId}&app_key=${edamamAppKey}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.hits.length > 0) {
                displayRecipes(data.hits);
            } else {
                // No recipes found, display a message
                recipeResults.innerHTML = 'No recipes found for the given ingredients.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function displayRecipes(recipes) {
    recipeResults.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
            <h2>${recipe.recipe.label}</h2>
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <p>Serves ${recipe.recipe.yield} people</p>
            <ul>
                ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.recipe.url}" target="_blank" rel="noopener noreferrer">Full Recipe</a>
        `;
        recipeResults.appendChild(recipeCard);
    });
}

