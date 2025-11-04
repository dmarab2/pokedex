import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
    {
        input: "   hello   world   ",
        expected: ["hello", "world"],
    },
    {
        input: "charmander   Squirtle     PIKACHU   ",
        expected: ["charmander", "squirtle", "pikachu"],
    },
    {
        input: "koffing ekans",
        expected: ["koffing", "ekans"],
    },
    // TODO: more test cases
])("cleanInput($input)", ({ input, expected }) => {
    const actual = cleanInput(input);
    test(`Expected: ${expected}`, () => {
        expect(actual).toHaveLength(expected.length);
        for (const i in expected){
            expect(actual[i]).toBe(expected[i]);
        }
    });
}

);