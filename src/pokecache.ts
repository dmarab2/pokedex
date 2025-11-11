

export type CacheEntry<T> = {
    createdAt: number,
    val: T
};


export class Cache{
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(number: number){
        this.#interval = number;
        this.#startReapLoop();
    }
    
    add<T>(key: string, val: T){
        const now = Date.now();
        this.#cache.set(key, {createdAt: now, val: val});
    }

    get<T>(key: string): T | undefined{
        return this.#cache.get(key)?.val;
    }

    check(key: string): boolean{
        return this.#cache.has(key);
    }

    #reap = () => {
        this.#cache.forEach((value, key) => {
            if (value.createdAt < (Date.now() - this.#interval)){
                this.#cache.delete(key);
            }
        });
    }

    #startReapLoop(){
        this.#reapIntervalId = setInterval(this.#reap, this.#interval);
    }

    stopReapLoop(){
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}