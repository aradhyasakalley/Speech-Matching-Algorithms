

//function to calculate soundex code
function getSoundexCode(input) {

  let str = input.toUpperCase();
  str = str.replace(/[^A-Z]/g, '');
  
  if (str.length === 0) {
    return '';
  }
  
  const firstLetter = str.charAt(0);

  const mapping = {
    B: 1, F: 1, P: 1, V: 1,
    C: 2, G: 2, J: 2, K: 2, Q: 2, S: 2, X: 2, Z: 2,
    D: 3, T: 3,
    L: 4,
    M: 5, N: 5,
    R: 6
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

// // Example usage
// const input = 'Grate';
// const soundex = getSoundexCode(input);
// console.log(soundex);  // Output: J525


function matchSoundex(word1,word2){
  if(getSoundexCode(word1) == getSoundexCode(word2)){
    return true;
  }
  else{
    return false;
  }
}



//function to compare text 
function compareText(actualText, textSnippet) {

    //splitting the text variables into arrays
    const actualTextArray = actualText.split(' ');
    const textSnippetArray = textSnippet.split(' ');
  
    //pointers to iterate over actual text and the text snippet 
    let atp = 0;
    let tsp = 0;
    //variable to store the match score
    let score = 0;
    //arrays to store matched,missed and extra words
    let missedWords = [];
    let extraWords = [];
    let matchedWords = [];

    while (tsp < textSnippetArray.length && atp < actualTextArray.length) {
      if (matchSoundex(textSnippetArray[tsp],actualTextArray[atp])){
        //case of perfect index match
        matchedWords.push(actualTextArray[atp]);
        atp++;
        tsp++;
        score++;

      } else {
        let foundMatch = false;
        for (let i = atp + 1; i < Math.min(atp + 5, actualTextArray.length); i++) {
          //checking the next 5 words or so for the word spoken
          if (actualTextArray[i].includes(textSnippetArray[tsp])) {
            missedWords.push(actualTextArray[atp]);
            atp++;
            foundMatch = true;
            break;
          }
        }

        if (!foundMatch) {
          //if not found then added to extra words
          extraWords.push(textSnippetArray[tsp]);
          tsp++;
        }
      }
    }
  
    
    console.log('Matched words:', matchedWords);
    console.log('Extra words:', extraWords);
    console.log('Missed words:', missedWords);
    console.log('Match score: ',score);
  }
  
  //example text for testing
  const actualText = "The elephant had a whistle";
  const textSnippet = "The elefant extra a whistl";
  console.log('Actual Text: ',actualText);
  console.log('Text detected: ',textSnippet);
  
  compareText(actualText, textSnippet);
  