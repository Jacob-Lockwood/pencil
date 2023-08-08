/**
 * @file The entry point of the CLI.
 */

// import { parse as parseFlags } from "https://deno.land/std@0.197.0/flags/mod.ts";
// import * as v from "https://deno.land/x/valibot@v0.11.1/mod.ts";
// const programArguments = v
//   .object({
//     repl: v.useDefault(v.boolean(), false),
//     _: v.useDefault(v.tuple([v.nullable(v.string())]), [null]),
//   })
//   .parse(parseFlags(Deno.args));

import { lexSource } from "./lex.ts";

const source = prompt("What's the code? *");
if (!source) throw new Error("No code provided.");
const lexedResult = lexSource(source);
console.log(lexedResult);
