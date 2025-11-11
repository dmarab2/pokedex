import { State } from "./state";


export async function commandCatch(state: State, ...args: string[]){
    if (args.length < 1 || args.length > 1){
        console.log("You must provide only ONE Pokemon name.")
        return;
    }
    try{
        const pokeObject = await state.pokeApi.fetchPokemon(args[0]);
        console.log(`Throwing a Pokeball at ${pokeObject.name}...`);
        const catchCheck = Math.random();
        if (catchCheck > .49){
            console.log(`${pokeObject.name} was caught!`);
            state.pokedex[pokeObject.name] = pokeObject;
            console.log("You may now inspect this Pokemon with the inspect command.");
        }else{
            console.log(`${pokeObject.name} escaped!`)
        }
    }catch(error){
        console.log(error);
    }

}
