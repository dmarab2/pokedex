import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
};

export type State = {
    interface: Interface;
    commands: Record<string, CLICommand>;
}

export function initState(): State{
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
        // can add more commands here
    };
    let state = {
        interface: r1,
        commands: commands,
    };
    return state;

}