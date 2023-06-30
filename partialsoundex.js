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
      B: 1, F: 1, P: 1,
      V: 1, C: 2, G: 2,
      J: 2, K: 2, Q: 2,
      S: 2, X: 2, Z: 2,
      D: 3, T: 3, L: 4,
      M: 5, N: 5, R: 6,
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



  matchSoundexMispronounced(word1,word2){
    
  }



  console.log(getSoundexCode('apple'));
