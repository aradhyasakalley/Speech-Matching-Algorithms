import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';

class VoiceInputComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      partialText: '',
      isListening: false,
      lastWord: '', // Added state to store the last word
    };

    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechPartialResults = this.onSpeechPartialResults;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onSpeechStart = (e) => {
    this.setState({ partialText: '', lastWord: '' });
    // Handle speech start event
  }

  onSpeechPartialResults = (e) => {
    const partialResults = e.value;
    const partialText = partialResults.join(' ');
    const lastWord = this.getLastWord(partialText); // Get the last word
    this.setState({ partialText, lastWord });
    console.log('Partial Text:', partialText); // Log the partial text
    console.log('Last Word:', lastWord); // Log the last word
    
    setTimeout(() => {
      console.log('--------------------------------------');
    },100)
   
  }

  getLastWord = (text) => {
    const words = text.split(' ');
    return words[words.length - 1];
  }

  startListening = async () => {
    try {
      await Voice.start('en-US'); 
      this.setState({ isListening: true });
    } catch (e) {
      console.error(e);
    }
  }

  stopListening = async () => {
    try {
      await Voice.stop();
      this.setState({ isListening: false });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { partialText, isListening, lastWord } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={isListening ? this.stopListening : this.startListening}
        >
          <Text style={styles.buttonText}>
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </Text>
        </TouchableOpacity>

        <View style={styles.partialTextContainer}>
          <Text style={styles.partialText}>Partial Text: {partialText}</Text>
        </View>

        <View style={styles.lastWordContainer}>
          <Text style={styles.lastWord}>Last Word: {lastWord}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  partialTextContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
  },
  partialText: {
    fontSize: 16,
  },
  lastWordContainer: {
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    marginTop: 20,
  },
  lastWord: {
    fontSize: 16,
  },
});

export default VoiceInputComponent;
