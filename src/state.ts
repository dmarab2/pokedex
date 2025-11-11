import { PokeAPI } from "./pokeapi.js";
import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_map_back.js";
import { commandExplore } from "./command_explore.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    interface: Interface;
    commands: Record<string, CLICommand>;
    pokeApi: PokeAPI;
    nextLocationsURL: string | null;
    previousLocationsURL: string | null;
}

export function initState(): State{
    let pokeApi = new PokeAPI();
    let nextLocationsURL = "https://pokeapi.co/api/v2/location-area/";
    let previousLocationsURL = null;
    const r1 = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    })
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
    };
    let state = {
        interface: r1,
        commands: commands,
        pokeApi: pokeApi,
        nextLocationsURL: nextLocationsURL,
        previousLocationsURL: previousLocationsURL,
    };
    return state;

}