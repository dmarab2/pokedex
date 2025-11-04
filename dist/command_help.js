export function commandHelp(commands) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage: ");
    for (const command in commands) {
        console.log(`${commands[command].name}: ${commands[command].description}`);
    }
}
;
