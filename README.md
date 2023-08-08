Hello! This is the repository for Pencil, a programming language that I am working on. It's designed to be read and written like English, though it could probably be extended to a lot of languages with some translation.

All I've got so far is a fairly established idea about the language's syntax, and a lexer. I'm implementing the interpreter in TypeScript with Deno because I like TypeScript and I thought Deno seemed interesting and fairly intuitive.

If you have any feedback or ideas for the language, please open an issue! It would be really useful for me to get some more insight on how I could improve it.

What follows is my rough notes on how this language is going to be, in Pencil code:

-----

```
“Programs are saved in .txt files.”

“Function names can have spaces in them.”

To get the range from (<number> a) to (<number> b):
    Let (<number list> c) be (an empty list).
    “Type inference :D”
    Let (i) be (a).
    Repeat (b) times:
        Add (i) to list (c).
        Set (i) to (i + 1).
    Return (c).

To get whether all items in (<list> a) are true:
    For each (item) in (a):
        If (not (item)):
            Return (false).
    Return (true).

To get whether (<number> n) is prime:
    For each (divisor) in (the range from (2) to (n)):
        If ((n) is divisible by (divisor)):
            Return (false).
    Return (true).

Let (the raw input) be (
    the (1st) item of (the program’s arguments)
).
Let (the parsed input) be (
    (the raw input) parsed as a number
).
Print (whether (the parsed input) is prime) to the console.

“Syntax construct: Mapping
Note: This syntax isn't final.”
A mapping of a <number> to { whether (it) is prime }.

The result of applying (
    a mapping of a <number> to { whether (it) is prime }
) to each item of (the list).

“How I'm planning to implement the interpreter:
1. Lex the source into numbers, strings, parentheses, etc, 
   and words.
2. Add each variable declaration to a scoped list.
3. Add each function declaration to a scoped list.
4. For each connected section of words, search for a
  variable or a function that matches it.
5. Execute from top-to-bottom.”
```
