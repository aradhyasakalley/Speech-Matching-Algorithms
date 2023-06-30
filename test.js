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
// Function to determine a Soundex match
function matchSoundex(soundex1, soundex2) {
    if (soundex1 === soundex2) {
      return 'exact'; // Complete Soundex code match
    }
  
    if (soundex1.substring(0, 3) === soundex2.substring(0, 3)) {
      // Last digit difference
      const lastDigit1 = soundex1.charAt(3);
      const lastDigit2 = soundex2.charAt(3);
  
      if (lastDigit1 !== lastDigit2) {
        return 'lastDigit'; // Last digit difference
      }
  
      if (isOnlyOneCharacterDifferent(soundex1, soundex2)) {
        return 'oneCharacterDiff'; // Only one character differs (except the last)
      }
    }
  
    return 'noMatch'; // No match
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
  
  // Function to compare two arrays of texts
  function compareTextArrays(actualTextArray, textSnippetArray) {
    let atp = 0; // actualTextArray pointer
    let tsp = 0; // textSnippetArray pointer
    const matchedWords = [];
    const missedWords = [];
    const mispronouncedWords = [];
  
    while (tsp < textSnippetArray.length && atp < actualTextArray.length) {
      const actualWord = actualTextArray[atp];
      const snippetWord = textSnippetArray[tsp];
      const actualSoundex = getSoundexCode(actualWord);
      const snippetSoundex = getSoundexCode(snippetWord);
  
      if (actualWord === snippetWord) {
        matchedWords.push(actualWord);
        atp++;
        tsp++;
      } else {
        const soundexMatch = matchSoundex(snippetSoundex, actualSoundex);
  
        if (soundexMatch === 'exact') {
          matchedWords.push(actualWord);
          atp++;
          tsp++;
        } else if (soundexMatch === 'lastDigit') {
          matchedWords.push(actualWord);
          atp++;
          tsp++;
        } else if (soundexMatch === 'oneCharacterDiff') {
          mispronouncedWords.push(actualWord);
          atp++;
          tsp++;
        } else {
          let foundMatch = false;
  
          for (let i = atp + 1; i < Math.min(atp + 6, actualTextArray.length); i++) {
            const nextWord = actualTextArray[i];
            const nextSoundex = getSoundexCode(nextWord);
  
            if (matchSoundex(snippetSoundex, nextSoundex) !== 'noMatch') {
              missedWords.push(actualWord);
              atp = i + 1;
              foundMatch = true;
              break;
            }
          }
  
          if (!foundMatch) {
            tsp++;
          }
        }
      }
    }
  
    const extraWords = textSnippetArray.slice(tsp);
  
    console.log('Matched words:', matchedWords);
    console.log('Missed words:', missedWords);
    console.log('Extra words:', extraWords);
    console.log('Mispronounced words:', mispronouncedWords);
  }
  
  // Example text arrays for testing
  const actualTextArray = ['I', 'ate', 'the', 'apple', 'and', 'the', 'mango'];
  const textSnippetArray = ['I', 'ate', 'apple', 'the','mango'];
  
  console.log('Actual Text:', actualTextArray.join(' '));
  console.log('Text detected:', textSnippetArray.join(' '));
  
  compareTextArrays(actualTextArray, textSnippetArray);
  