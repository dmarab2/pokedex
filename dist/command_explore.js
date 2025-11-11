export async function commandExplore(state, ...args) {
    if (args.length < 1 || args.length > 1) {
        console.log("You must provide only ONE location name.");
        return;
    }
    try {
        const locationObject = await state.pokeApi.fetchLocation(args[0]);
        console.log(`Exploring ${locationObject.name}...`);
        console.log("Found the following Pokemon:");
        for (const pokemon_encounter of locationObject.pokemon_encounters) {
            console.log(`- '${pokemon_encounter.pokemon.name}'`);
        }
    }
    catch (error) {
        console.log("Error");
    }
}
