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
export function startREPL(state) {
    const r1 = state.interface;
    r1.prompt();
    r1.on('line', async (line) => {
        const finalArray = cleanInput(line);
        const [commandWord, ...argArray] = finalArray;
        const commandObj = state.commands;
        if (commandWord in commandObj) {
            try {
                await commandObj[commandWord].callback(state, ...argArray);
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
