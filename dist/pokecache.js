export class Cache {
    #cache = new Map();
    #reapIntervalId = undefined;
    #interval;
    constructor(number) {
        this.#interval = number;
        this.#startReapLoop();
    }
    add(key, val) {
        const now = Date.now();
        this.#cache.set(key, { createdAt: now, val: val });
    }
    get(key) {
        return this.#cache.get(key)?.val;
    }
    check(key) {
        return this.#cache.has(key);
    }
    #reap = () => {
        this.#cache.forEach((value, key) => {
            if (value.createdAt < (Date.now() - this.#interval)) {
                this.#cache.delete(key);
            }
        });
    };
    #startReapLoop() {
        this.#reapIntervalId = setInterval(this.#reap, this.#interval);
    }
    stopReapLoop() {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
