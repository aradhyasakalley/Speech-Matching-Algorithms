function countSimilarCharacters(string1, string2) {
  const map1 = createCharacterMap(string1);
  const map2 = createCharacterMap(string2);

  let count = 0;

  for (const char in map1) {
    if (map2[char]) {
      count += Math.min(map1[char], map2[char]);
    }
  }

  return count;
}

function createCharacterMap(string) {
  const charMap = {};

  for (const char of string) {
    charMap[char] = (charMap[char] || 0) + 1;
  }

  return charMap;
}

const string1 = "A140";
const string2 = "A230";

const count = countSimilarCharacters(string1, string2);
console.log(count); 
