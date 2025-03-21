async function getChefBirthday(id) {
    try {
        // 1. recupero ricetta
        const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);
        if (!recipeResponse.ok) throw new Error("Errore nel recupero della ricetta!");
        const recipe = await recipeResponse.json();

        // 2. estraggo userId dalla ricetta
        const userId = recipe.userId;
        if (!userId) throw new Error("userId non trovato nella ricetta!");

        // 3. ottengo i dati dello chef
        const userResponse = await fetch(`https://dummyjson.com/users/${userId}`);
        if (!userResponse.ok) throw new Error("Errore nel recupero delle informazioni dello chef!");
        const user = await userResponse.json();

        // 4. restituisco la data di nascita dello chef
        return user.birthDate;
    } catch (error) {
        console.error("Errore:", error.message);
        throw error; // Propaga l'errore se necessario
    }
}

// esempio di utilizzo
getChefBirthday(7)
    .then(birthday => console.log("Data di nascita dello chef:", birthday))
    .catch(error => console.error("Errore:", error.message));