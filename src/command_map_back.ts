import { State} from "./state.js";

export async function commandMapBack(state: State){
    if (state.previousLocationsURL === null){
        console.log("You're on the first page.");
        return;
    }
    try{
        const mapObject = await state.pokeApi.fetchLocations(state.previousLocationsURL);
        for (const area of mapObject.results){
            console.log(area.name);
        }
        state.nextLocationsURL = mapObject.next;
        state.previousLocationsURL = mapObject.previous;

    }catch(error){
        console.log(error);
    }
};