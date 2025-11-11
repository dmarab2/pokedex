import { State} from "./state.js";

export async function commandMap(state: State){
    if (state.nextLocationsURL === null){
        throw new Error("Cannot go any further!")
    }
    try{
        const mapObject = await state.pokeApi.fetchLocations(state.nextLocationsURL);
        for (const area of mapObject.results){
            console.log(area.name);
        }
        if(mapObject.next === null){
            console.log("Cannot go any further than this.");
        }
        else{
            state.nextLocationsURL = mapObject.next;
            state.previousLocationsURL = mapObject.previous;
        }

    }catch(error){
        console.log(error);
    }
};