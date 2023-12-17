import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import {useFonts} from 'expo-font'
import StartGameScreen from "./screens/StartGameScreens";
import GameOverScreen from "./screens/GameOverScreen";
import { LinearGradient } from "expo-linear-gradient";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import AppLoading from 'expo-app-loading'

export default function App() {
  
  const [userNumber, setUserNumber] = useState("");
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0)
  const [fontsLoaded] = useFonts({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  });
  if(!fontsLoaded) return <AppLoading />
  // console.log("fontsLoaded",fontsLoaded);
  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false)
  };
  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds)
  };

  const startNewGameHandler = () =>{
    setUserNumber(null)
    setGuessRounds(0)
  }
 
  return (
    <LinearGradient
      colors={[Colors.accent500, Colors.primary800]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/images/dices.jpg")}
        resizeMode="cover"
        style={styles.rootBack}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>
          {gameIsOver && userNumber ? (
            <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onStartNewGame={startNewGameHandler} />
          ) : userNumber ? (
            <GameScreen
              gameOverHandler={gameOverHandler}
              userNumber={userNumber}
            />
          ) : (
            <StartGameScreen onPickedNumber={pickedNumberHandler} />
          )}
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  rootBack: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
