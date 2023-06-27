// initial brainstorming
const actualTextWords = actualText.split(' ');
    const textInProgressWords = textInProgress.split(' ');
  
    let highlightedWord = null;
    let correctMatchIndices = [];
    let missedWords = [];
    let extraWords = [];

    for (let i = 0; i < textInProgressWords.length; i++) {
      const inProgressWord = textInProgressWords[i];
      let matchFound = false;

      let initialj = 0;

      if (correctMatchIndices.length > 0)
        initialj = 0;// last index of correctMatchIndices + 1
  
      for (let j = initialj ; j < initialj+5 ; j++) {
        const actualWord = actualTextWords[j];
  
        if (actualWord && inProgressWord && actualWord.toLowerCase().includes(inProgressWord.toLowerCase())) {
          correctMatchIndices.push(j); 
          matchFound = true;
          break;
        }
      }
  
      if (!matchFound) {
        extraWords.push(inProgressWord); // Also push starting j index  - initialj 
      }
    }