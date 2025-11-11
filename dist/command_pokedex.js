export async function commandPokedex(state) {
    if (Object.keys(state.pokedex).length === 0) {
        console.log("You have not caught any Pokemon!");
        return;
    }
    console.log("Your Pokedex:");
    for (const pokeName of Object.keys(state.pokedex)) {
        console.log(`   - ${pokeName}`);
    }
}
