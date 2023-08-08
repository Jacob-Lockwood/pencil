interface Token {
  type:
    | "string"
    | "number"
    | "lbracket"
    | "rbracket"
    | "lparen"
    | "rparen"
    | "word"
    | "tab"
    | "period";
  startIndex: number;
  text: string;
}
const tokenMap = {
  "[": "lbracket",
  "]": "rbracket",
  "(": "lparen",
  ")": "rparen",
  ".": "period",
} as const;

export function lexSource(source: string) {
  const tokens: Token[] = [];
  let currentToken:
    | (Token & { type: "string" | "number" | "tab" | "word" })
    | undefined;
  function handleNewToken(char: string, index: number) {
    if (currentToken) {
      tokens.push(currentToken);
      currentToken = undefined;
    }
    if (char in tokenMap) {
      tokens.push({
        type: tokenMap[char as keyof typeof tokenMap],
        text: char,
        startIndex: index,
      });
    } else {
      currentToken = {
        type: char === '"'
          ? "string"
          : char === " "
          ? "tab"
          : /\d/.test(char)
          ? "number"
          : "word",
        text: char,
        startIndex: index,
      };
    }
  }
  for (let index = 0; index < source.length; index++) {
    const currentChar = source[index];
    if (currentToken?.type === "tab") {
      if (currentChar === " ") {
        currentToken.text += currentChar;
      } else {
        currentToken = undefined;
        handleNewToken(currentChar, index);
        continue;
      }
      if (currentToken.text.length === 4) {
        tokens.push(currentToken);
        currentToken = undefined;
      }
    } else if (currentToken?.type === "string") {
      if (currentChar === '"') {
        currentToken.text += currentChar;
        tokens.push(currentToken as Token);
        currentToken = undefined;
      } else {
        currentToken.text += currentChar;
      }
    } else if (currentToken?.type === "number") {
      if (currentChar === ".") {
        if (currentToken.text.includes(".")) {
          throw new Error("A number cannot have more than one decimal point.");
        }
        currentToken.text += currentChar;
      } else if (/\d/.test(currentChar)) {
        currentToken.text += currentChar;
      } else {
        handleNewToken(currentChar, index);
      }
    } else if (!currentToken || currentChar in tokenMap) {
      handleNewToken(currentChar, index);
    } else {
      currentToken.text += currentChar;
    }
  }
  if (currentToken) tokens.push(currentToken);
  return tokens;
}
