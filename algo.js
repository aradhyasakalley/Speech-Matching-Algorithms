function compareStrings(actualText, textInProgress) {
    const actualTextWords = actualText.split(' ');
    const textInProgressWords = textInProgress.split(' ');
  
    let highlightedWord = null;
    let correctMatchIndices = [];
    let missedWords = [];
    let extraWords = [];
  
    for (let i = 0; i < actualTextWords.length; i++) {
      const actualWord = actualTextWords[i];
      let matchFound = false;
  
      for (let j = 0; j < textInProgressWords.length; j++) {
        const inProgressWord = textInProgressWords[j];
  
        if (actualWord && inProgressWord && actualWord.toLowerCase().includes(inProgressWord.toLowerCase())) {
          highlightedWord = actualWord;
          correctMatchIndices.push(j);
          matchFound = true;
          break;
        }
      }
  
      if (!matchFound) {
        missedWords.push(actualWord);
      }
    }
  
    extraWords = textInProgressWords.filter(word => !actualTextWords.includes(word));
  
    return { highlightedWord, correctMatchIndices, missedWords, extraWords };
  }
  
  const actualText = "i ate the apple and the mango";
  // best case 
  // const textInProgress = "one two three four five six seven eight"
  // average case 
  const textInProgress = "i ate app and the mango";
  
  // worst case 
  // const textInProgress = "apple mango pear watermelon"
  const result = compareStrings(actualText, textInProgress);
  console.log("actual text : ",actualText);
  console.log("text in progress : ",textInProgress)
  console.log(result);
  