import { PokeAPI } from "./pokeapi.js";
import { createInterface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_map_back.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
export function initState() {
    let pokeApi = new PokeAPI();
    let nextLocationsURL = "https://pokeapi.co/api/v2/location-area/";
    let previousLocationsURL = null;
    const r1 = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    const commands = {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Displays the available commands",
            callback: commandHelp,
        },
        map: {
            name: "map",
            description: "Displays the next 20 locations",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Displays the previous 20 locations",
            callback: commandMapBack,
        },
        explore: {
            name: "explore",
            description: "Explore and see which Pokemon can be encountered",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Try to catch a Pokemon.",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Inspect a Pokemon in the Pokedex.",
            callback: commandInspect,
        },
        pokedex: {
            name: "pokedex",
            description: "List all Pokemon in the Pokedex.",
            callback: commandPokedex,
        },
    };
    let state = {
        interface: r1,
        commands: commands,
        pokeApi: pokeApi,
        nextLocationsURL: nextLocationsURL,
        previousLocationsURL: previousLocationsURL,
        pokedex: {},
    };
    return state;
}
