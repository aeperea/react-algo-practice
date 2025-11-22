// Rules:
// No characters that are not brackets (immediatley return false).
// Open brackets must be closed by the same type of bracket.
// Open brackets must be closed in the correct order.
// Every closing bracket has a corresponding opening bracket.

export default function parenthesisParsing(stringWithParenthesis) {
  if (stringWithParenthesis.length === 0) {
    return false;
  }
  let stack = [];
  let parenthesisMap = {
    '(': ')',
    '[': ']',
    '{': '}',
  };
  const validChars = new Set(['(', ')', '[', ']', '{', '}']);

  for (let character of stringWithParenthesis) {
    if (!validChars.has(character)) {
      return false;
    }

    if (parenthesisMap[character]) {
      stack.push(parenthesisMap[character]);
    } else {
      if (stack.length === 0) {
        return false;
      }
      const expected = stack.pop();
      if (character !== expected) {
        return false;
      }
    }
  };

  return stack.length === 0;
}
