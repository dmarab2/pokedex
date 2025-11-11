import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache = new Cache(120000);

  constructor() {}

  async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
    if (pageURL === undefined || pageURL === null){
        throw new Error("Can't go any further!");
    }
    if (this.cache.check(pageURL)){
        console.log("Cache hit!");
        const result: ShallowLocations = this.cache.get(pageURL) as ShallowLocations;
        return result
    }
    try{
        const response = await fetch(pageURL);
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const result: ShallowLocations = await response.json()
        this.cache.add(pageURL, result);
        return result
    }catch(error){
        console.log(`An error occured: ${error}`);
        throw error;
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = PokeAPI.baseURL + "/location-area/" + locationName;
    if (this.cache.check(fullURL)){
        console.log("Cache hit!");
        const result: Location = this.cache.get(fullURL) as Location;
        return result;
    }
    try{
        const response = await fetch(fullURL);
        if (!response.ok){
            throw new Error(`Response status: ${response.status}`);
        }
        const result: Location = await response.json()
        this.cache.add(fullURL, result);
        return result;
    }catch(error){
        console.log(`An error occured: ${error}`);
        throw error;
    }
  }
}

export type ShallowLocations = {
  // add properties here
    count: number,
    next: string | null,
    previous: string | null,
    results: Result[]
};

export type Result = {
    name: string,
    url: string,
};

export type Location = {
  encounter_method_rates: EncounterMethodRate[]
  game_index: number
  id: number
  location: GameLocation
  name: string
  names: Name[]
  pokemon_encounters: PokemonEncounter[]
}

export interface EncounterMethodRate {
  encounter_method: EncounterMethod
  version_details: VersionDetail[]
}

export interface EncounterMethod {
  name: string
  url: string
}

export interface VersionDetail {
  rate: number
  version: Version
}

export interface Version {
  name: string
  url: string
}

export interface GameLocation {
  name: string
  url: string
}

export interface Name {
  language: Language
  name: string
}

export interface Language {
  name: string
  url: string
}

export interface PokemonEncounter {
  pokemon: Pokemon
  version_details: VersionDetail2[]
}

export interface Pokemon {
  name: string
  url: string
}

export interface VersionDetail2 {
  encounter_details: EncounterDetail[]
  max_chance: number
  version: Version2
}

export interface EncounterDetail {
  chance: number
  condition_values: any[]
  max_level: number
  method: Method
  min_level: number
}

export interface Method {
  name: string
  url: string
}

export interface Version2 {
  name: string
  url: string
}