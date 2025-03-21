async function getChefBirthday(id) {
    try {
        // 1. recupero la ricetta
        const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);

        if (!recipeResponse.ok) {
            throw new Error(`Errore: Ricetta con id ${id} non trovata!`);
        }

        const recipe = await recipeResponse.json();

        // 2. verifico se userId è valido prima di fare la seconda richiesta
        if (!recipe.userId) {
            throw new Error(`Errore: La ricetta con id ${id} non contiene un userId valido!`);
        }

        // 3. ottenego i dati dello chef
        const userResponse = await fetch(`https://dummyjson.com/users/${recipe.userId}`);

        if (!userResponse.ok) {
            throw new Error(`Errore: Utente con id ${recipe.userId} non trovato!`);
        }

        const user = await userResponse.json();

        // 4. restituisco la data di nascita dello chef
        return user.birthDate;
    } catch (error) {
        console.error("Errore:", error.message);
        throw error; // propaga l'errore se necessario
    }
}

// Esempio di utilizzo
getChefBirthday(1)
    .then(birthday => console.log("Data di nascita dello chef:", birthday))
    .catch(error => console.error("Errore:", error.message));