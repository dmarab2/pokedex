import { commandExit } from "./command_exit.js";
import { createInterface } from "node:readline";
import { stringify } from "querystring";
import { getCommands } from "./command.js";
import { State } from "./state.js";

export function cleanInput(input: string): string[]{
    const betaArray: string[] = input.split(" ");
    const finalArray: string[] = [];
    for (const stringElement of betaArray){
        if (stringElement.trim().length === 0){
            continue;
        }
        finalArray.push(stringElement.trim().toLowerCase());
    }
    return finalArray;
};

export function startREPL(state: State){
    const r1 = state.interface;
    r1.prompt();
    r1.on('line', (line: string) => {
        const finalArray = cleanInput(line);
        const commandWord = finalArray[0];
        const commandObj = state.commands;
        if (commandWord in commandObj){
            try {
                commandObj[commandWord].callback(state);
                r1.prompt()
            } catch (error) {
                console.log(error);
                r1.prompt();
            }
        }
        else{
            console.log("Unknown command");
            r1.prompt();
        }
    })
}