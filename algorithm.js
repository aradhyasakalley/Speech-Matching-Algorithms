// Function to calculate Soundex code

function getSoundexCode(input) {
  let str = input.toUpperCase();
  str = str.replace(/[^A-Z]/g, '');

  if (str.length === 0) {
    return '';
  }

  const firstLetter = str.charAt(0);
  const mapping = {
    B: 1, F: 1, P: 1, V: 1, C: 2,
    G: 2, J: 2, K: 2, Q: 2, S: 2,
    X: 2, Z: 2, D: 3, T: 3, L: 4,
    M: 5, N: 5, R: 6
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

  soundexCode = soundexCode.replace(/0/g, '');

  if (soundexCode.length > 4) {
    soundexCode = soundexCode.substring(0, 4);
  } else {
    soundexCode = soundexCode.padEnd(4, '0');
  }

  return soundexCode;
}



// Function to determine a full Soundex match
function matchSoundex(word1, word2) {
  if (getSoundexCode(word1) === getSoundexCode(word2)) {
    return true;
  } else {
    return false;
  }
}



// Function to compare text as per the pointer
function compareText(actualText, textSnippet) {


  const actualTextArray = actualText.split(' ');
  const textSnippetArray = textSnippet.split(' ');

  //initializing the variables and pointers
  let atp = 0;
  let tsp = 0;
  let score = 0;
  let missedWords = [];
  let extraWords = [];
  let matchedWords = [];
  let mispronouncedWords = [];

  // scanning the text snippet for match
  while (tsp < textSnippetArray.length && atp < actualTextArray.length) {

    if (matchSoundex(textSnippetArray[tsp], actualTextArray[atp])) {
      // case of perfect match

      matchedWords.push(actualTextArray[atp]);
      atp++;
      tsp++;
      score++;

    } 
    else {
      //checking further 5 words for in actual text
      let foundMatch = false;
      for (let i = atp + 1; i < Math.min(atp + 5, actualTextArray.length); i++) {
        if (actualTextArray[i].includes(textSnippetArray[tsp])) {
          missedWords.push(actualTextArray[atp]);
          atp++;
          foundMatch = true;
          break;
        }
      }

      // if only the last word does not match

      if (!foundMatch && textSnippetArray[tsp].slice(0, -1) === actualTextArray[atp].slice(0, -1)) {
        matchedWords.push(actualTextArray[atp]);
        atp++;
        foundMatch = true;
      }

      // if only one character differs (except the last)
      if (!foundMatch && isOnlyOneCharacterDifferent(textSnippetArray[tsp], actualTextArray[atp])) {
        mispronouncedWords.push(actualTextArray[atp]);
        atp++;
        foundMatch = true;
      }

      //adding to both extra and mispronounced
      if (!foundMatch) {
        if (!mispronouncedWords.includes(actualTextArray[atp])) {
          extraWords.push(textSnippetArray[tsp]);
        }
        tsp++;
      }
    }
  }

  console.log('Matched words:', matchedWords);
  console.log('Extra words:', extraWords);
  console.log('Missed words:', missedWords);
  console.log('Mispronounced words:', mispronouncedWords);
  console.log('Match score:', score);
}


// Helper function to check if only one character is different (except the last)
function isOnlyOneCharacterDifferent(word1, word2) {
  if (word1.length !== word2.length) {
    return false;
  }

  let diffCount = 0;
  for (let i = 0; i < word1.length - 1; i++) {
    if (word1[i] !== word2[i]) {
      diffCount++;
      if (diffCount > 1) {
        return false;
      }
    }
  }

  return diffCount === 1;
}

// Example text for testing
const actualText = 'son is very sun has no moon';
const textSnippet = 'son has moon';

console.log('Actual Text:', actualText);
console.log('Text detected:', textSnippet);

compareText(actualText, textSnippet);






