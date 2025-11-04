import { createInterface } from "node:readline";
import { getCommands } from "./command.js";
export function cleanInput(input) {
    const betaArray = input.split(" ");
    const finalArray = [];
    for (const stringElement of betaArray) {
        if (stringElement.trim().length === 0) {
            continue;
        }
        finalArray.push(stringElement.trim().toLowerCase());
    }
    return finalArray;
}
;
export function startREPL() {
    const r1 = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    });
    r1.prompt();
    r1.on('line', (line) => {
        const finalArray = cleanInput(line);
        const commandWord = finalArray[0];
        const commandObj = getCommands();
        if (commandWord in commandObj) {
            try {
                commandObj[commandWord].callback(commandObj);
                r1.prompt();
            }
            catch (error) {
                console.log(error);
                r1.prompt();
            }
        }
        else {
            console.log("Unknown command");
            r1.prompt();
        }
    });
}
