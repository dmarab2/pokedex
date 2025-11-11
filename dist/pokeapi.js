import { Cache } from "./pokecache.js";
export class PokeAPI {
    static baseURL = "https://pokeapi.co/api/v2";
    cache = new Cache(120000);
    constructor() { }
    async fetchLocations(pageURL) {
        if (pageURL === undefined || pageURL === null) {
            throw new Error("Can't go any further!");
        }
        if (this.cache.check(pageURL)) {
            console.log("Cache hit!");
            const result = this.cache.get(pageURL);
            return result;
        }
        try {
            const response = await fetch(pageURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            this.cache.add(pageURL, result);
            return result;
        }
        catch (error) {
            console.log(`An error occured: ${error}`);
            throw error;
        }
    }
    async fetchLocation(locationName) {
        const fullURL = PokeAPI.baseURL + "/location-area/" + locationName;
        if (this.cache.check(fullURL)) {
            console.log("Cache hit!");
            const result = this.cache.get(fullURL);
            return result;
        }
        try {
            const response = await fetch(fullURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            this.cache.add(fullURL, result);
            return result;
        }
        catch (error) {
            console.log(`An error occured: ${error}`);
            throw error;
        }
    }
    async fetchPokemon(pokemon) {
        const fullURL = PokeAPI.baseURL + "/pokemon/" + pokemon;
        if (this.cache.check(fullURL)) {
            console.log("Cache hit!");
            const result = this.cache.get(fullURL);
            return result;
        }
        try {
            const response = await fetch(fullURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const result = await response.json();
            this.cache.add(fullURL, result);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
