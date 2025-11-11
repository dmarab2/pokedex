import { CLICommand, State} from "./state.js";

export async function commandHelp(state: State){
    const commands = state.commands;
    console.log("Welcome to the Pokedex!");
    console.log("Usage: ");
    for (const command in commands){
        console.log(`${commands[command].name}: ${commands[command].description}`);
    }
};