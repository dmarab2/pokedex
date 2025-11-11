import { State } from "./state";

export async function commandInspect(state: State, ...args: string[]){
    if (args.length < 1 || args.length > 1){
        console.log("You must provide only ONE Pokemon name.");
        return;
    }
    const pokeName = args[0];
    if (!(pokeName in state.pokedex)){
        console.log("You have not caught that Pokemon!");
        return;
    }
    const pokeObject = state.pokedex[pokeName];
    console.log(`Name: ${pokeObject.name}`);
    console.log(`Height: ${pokeObject.height}`);
    console.log(`Weight: ${pokeObject.weight}`);
    console.log("Stats:");
    for (const statObj of pokeObject.stats){
        console.log(`   ${statObj.stat.name}: ${statObj.base_stat}`);
    }
    console.log("Types:")
    for (const typeObj of pokeObject.types){
        console.log(`   - ${typeObj.type.name}`);
    }



}