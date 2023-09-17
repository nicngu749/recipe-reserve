const edamamAppId = '67bb73bd'; // Edamam App ID
const edamamAppKey = 'a3f1f84da3baadbe2f2d761b40629ab9'; // Edamam App Key
const searchBtn = document.getElementById('searchBtn');
const ingredientsInput = document.getElementById('ingredients');
const recipeResults = document.getElementById('recipeResults');
const advancedOptions = document.getElementById('advancedOptions'); // New

const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const userIngredients = ingredientsInput.value.toLowerCase();
    let apiUrl = `https://api.edamam.com/search?q=${userIngredients}&app_id=${edamamAppId}&app_key=${edamamAppKey}`;

    // Check dietary restrictions and add them to the API request if selected
    const veganCheckbox = document.getElementById('vegan');
    const vegetarianCheckbox = document.getElementById('vegetarian');
    const dairyFreeCheckbox = document.getElementById('dairyFree');
    const glutenFreeCheckbox = document.getElementById('glutenFree');

    if (veganCheckbox.checked) {
        apiUrl += '&health=vegan';
    }
    if (vegetarianCheckbox.checked) {
        apiUrl += '&health=vegetarian';
    }
    if (dairyFreeCheckbox.checked) {
        apiUrl += '&health=dairy-free';
    }
    if (glutenFreeCheckbox.checked) {
        apiUrl += '&health=gluten-free';
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.hits.length > 0) {
                displayRecipes(data.hits);
            } else {
                // no recipes found
                recipeResults.innerHTML = 'No recipes found for the given ingredients and dietary restrictions.';
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

// Add an event listener to the "Advanced Options" button to toggle its display
const advancedOptionsBtn = document.getElementById('advancedOptionsBtn');

advancedOptionsBtn.addEventListener('click', () => {
    if (advancedOptions.style.display === 'none' || advancedOptions.style.display === '') {
        advancedOptions.style.display = 'block';
    } else {
        advancedOptions.style.display = 'none';
    }
});
