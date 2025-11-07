import { startREPL } from "./repl.js";
import { CLICommand, State, initState } from "./state.js";
function main(){
	let state = initState();
	startREPL(state);
}

main();
