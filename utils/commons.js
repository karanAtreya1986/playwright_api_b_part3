//common utility functions.

/**
 * This code defines a utility function stringFormat in JavaScript/TypeScript, which mimics a common string formatting pattern used in other languages like C# or Python.

✅ Function Purpose
The function replaces placeholders in a string (like {0}, {1}, etc.) with corresponding values from the args array.

🔹 str:
The base string with placeholders like {0}, {1}, etc.

🔹 ...args:
The values that will replace the placeholders.

The values that will replace the placeholders.

🔹 str.replace(/{(\d+)}/g, ...):
A regular expression that finds all substrings that match {number} format.

{(\d+)}: Captures one or more digits inside curly braces.

g: Global flag to replace all instances.

🔹 (match, index) => args[index].toString() || "":

For each placeholder found:

index is the captured number inside {}.

It replaces the placeholder with the corresponding argument value converted to a string.

If the argument is undefined or null, it falls back to an empty string.

examples-

stringFormat("Hello, {0}! You have {1} messages.", "Alice", 5);
// Output: "Hello, Alice! You have 5 messages."

stringFormat("This is {0}, and this is {2}.", "X", "Y", "Z");
// Output: "This is X, and this is Z."


stringFormat("Missing {0} and {1}", "onlyOne");
// Output: "Missing onlyOne and "



 */

import { expect} from "@playwright/test";

/* String format.
* @param str String, needs to be formatted.
* @param args Arguments, needs to be placed properly in the string.
*/
export const stringFormat = (str, ...args) =>
   str.replace(/{(\d+)}/g, (match, index) => args[index].toString() || "");