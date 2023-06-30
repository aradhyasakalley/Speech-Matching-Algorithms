function getSoundexCode(input) {
  if (!input) {
    return "";
  }

  let str = input.toUpperCase();
  str = str.replace(/[^A-Z]/g, "");

  if (str.length === 0) {
    return "";
  }

  const firstLetter = str.charAt(0);
  const mapping = {
    B: 1,
    F: 1,
    P: 1,
    V: 1,
    C: 2,
    G: 2,
    J: 2,
    K: 2,
    Q: 2,
    S: 2,
    X: 2,
    Z: 2,
    D: 3,
    T: 3,
    L: 4,
    M: 5,
    N: 5,
    R: 6,
  };

  let soundexCode = firstLetter;
  let previousCode = mapping[firstLetter];

  for (let i = 1; i < str.length; i++) {
    const letter = str.charAt(i);
    const code = mapping[letter];

    if (code && code !== previousCode) {
      soundexCode += code;
      previousCode = code;
    }
  }

  soundexCode = soundexCode.replace(/0/g, "");

  if (soundexCode.length > 4) {
    soundexCode = soundexCode.substring(0, 4);
  } else {
    soundexCode = soundexCode.padEnd(4, "0");
  }

  return soundexCode;
}

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

function isLastCharacterDifferent(string1, string2) {
  const lastChar1 = string1[string1.length - 1];
  const lastChar2 = string2[string2.length - 1];

  return lastChar1 !== lastChar2;
}

function matchSoundexMispronounced(word1, word2) {
  soundexCode1 = getSoundexCode(word1);
  soundexCode2 = getSoundexCode(word2);
  console.log(soundexCode1);
  console.log(soundexCode2);
  let similarCharacters = countSimilarCharacters(soundexCode1,soundexCode2)
  console.log(similarCharacters);
  if (similarCharacters == 3) { 
    if (isLastCharacterDifferent(word1, word2)) {
      console.log("last character different --> perfect match");
    } else {
      console.log("some other character different --> mispronounced");
    }
  } else {
    console.log("different");
  }
}

matchSoundexMispronounced("apple", "use");

