// Function to calculate Soundex code
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

// Function to check if Soundex codes are exactly the same
function matchSoundexPerfect(word1, word2) {
  return getSoundexCode(word1) === getSoundexCode(word2);
}

// Function to check if only the last digit of Soundex codes is different
function matchSoundexPartial(word1, word2) {
  const soundexCode1 = getSoundexCode(word1);
  const soundexCode2 = getSoundexCode(word2);

  if (soundexCode1.length === soundexCode2.length) {
    const lastDigit1 = soundexCode1.charAt(soundexCode1.length - 1);
    const lastDigit2 = soundexCode2.charAt(soundexCode2.length - 1);

    return lastDigit1 !== lastDigit2;
  }

  return false;
}

// Function to check if any one digit of Soundex codes is different except the last one
function matchSoundexMispronounced(word1, word2) {
  const soundexCode1 = getSoundexCode(word1).toString();
  const soundexCode2 = getSoundexCode(word2).toString();

  if (soundexCode1.length === soundexCode2.length) {
    let diffCount = 0;
    for (let i = 0; i < soundexCode1.length - 1; i++) {
      if (soundexCode1[i] !== soundexCode2[i]) {
        diffCount++;
        if (diffCount > 1) {
          return false;
        }
      }
    }
    return diffCount === 1;
  }

  return false;
}

// Function to compare text as per the pointer
function compareText(actualText, textSnippet) {
  const actualTextArray = actualText.split(" ");
  const textSnippetArray = textSnippet.split(" ");

  // initializing the variables and pointers
  let atp = 0;
  let tsp = 0;
  let score = 0;
  let missedWords = [];
  let extraWords = [];
  let matchedWords = [];
  let mispronouncedWords = [];

  // scanning the text snippet for match
  while (tsp < textSnippetArray.length && atp < actualTextArray.length) {
    if (actualTextArray[atp].includes(textSnippetArray[tsp])) {
      // case of perfect match
      matchedWords.push(actualTextArray[atp]);
      atp++;
      tsp++;
      score++;
    } else if (matchSoundexPerfect(actualTextArray[atp], textSnippetArray[tsp])) {
      // when soundex match is perfect but words are not
      matchedWords.push(actualTextArray[atp]);
      atp++;
      tsp++;
      score++;
    } else if (matchSoundexPartial(actualTextArray[atp], textSnippetArray[tsp])) {
      // only last digit different
      matchedWords.push(actualTextArray[atp]);
      atp++;
      tsp++;
      score++;
    } else if (matchSoundexMispronounced(actualTextArray[atp], textSnippetArray[tsp])) {
      // only one digit different except last
      mispronouncedWords.push(actualTextArray[atp]);
      atp++;
      tsp++;
    } else {
      for (let i = atp + 1; i < Math.min(atp + 5, actualTextArray.length); i++) {
        if (actualTextArray[i].includes(textSnippetArray[tsp])) {
          missedWords.push(actualTextArray[atp]);
          atp++;
        } else if (matchSoundexPerfect(actualTextArray[i], textSnippetArray[tsp])) {
          missedWords.push(actualTextArray[atp]);
          atp++;
        } else if (matchSoundexPartial(actualTextArray[i], textSnippetArray[tsp])) {
          missedWords.push(actualTextArray[atp]);
          atp++;
        } else if (matchSoundexMispronounced(actualTextArray[i], textSnippetArray[tsp])) {
          mispronouncedWords.push(actualTextArray[atp]);
          atp++;
        } else {
          extraWords.push(textSnippetArray[tsp]);
          tsp++;
        }
      }
    }
  }

  console.log("Matched words:", matchedWords);
  console.log("Extra words:", extraWords);
  console.log("Missed words:", missedWords);
  console.log("Mispronounced words:", mispronouncedWords);
  console.log("Match score:", score);
}

// Example text for testing
const actualText = "I ate the huge apple and the red mango";
const textSnippet = "I ate use apple the mango";

console.log("Actual Text:", actualText);
console.log("Text detected:", textSnippet);

compareText(actualText, textSnippet);
