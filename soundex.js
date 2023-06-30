function getSoundexCode(input) {
    // Step 1: Convert the input string to uppercase
    let str = input.toUpperCase();
    
    // Step 2: Remove non-alphabetic characters
    str = str.replace(/[^A-Z]/g, '');
    
    // Check for empty string
    if (str.length === 0) {
      return '';
    }
    
    // Step 3: Keep the first letter
    const firstLetter = str.charAt(0);
    
    // Step 4: Assign numeric codes to the remaining letters
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
      
      // Skip letters with the same code as the previous one
      if (code && code !== previousCode) {
        soundexCode += code;
        previousCode = code;
      }
    }
    
    // Step 5: Remove zeros
    soundexCode = soundexCode.replace(/0/g, '');
    
    // Step 6: Limit the code to four characters
    if (soundexCode.length > 4) {
      soundexCode = soundexCode.substring(0, 4);
    } else {
      soundexCode = soundexCode.padEnd(4, '0');
    }
    
    return soundexCode;
  }
  
  // Example usage
  const input = 'the';
  const soundex = getSoundexCode(input);
  console.log(soundex); 
  