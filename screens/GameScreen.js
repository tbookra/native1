import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import { useState, useEffect } from "react";
import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import GuessLogItem from "../components/game/GuessLogItem";

const generateRandomBetween = (min, max, exclude) => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
let minBoundarey = 1;
let maxBoundarey = 100;

const GameScreen = ({ userNumber, gameOverHandler }) => {
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);
  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", "You know that this is wrong..", [
        {
          text: "Sorry",
          style: "cancel",
        },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundarey = currentGuess - 1;
    } else {
      minBoundarey = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundarey,
      maxBoundarey,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prev) => [newRndNumber, ...prev]);
  };
  useEffect(() => {
    if (userNumber === currentGuess) {
      gameOverHandler(guessRounds.length);
    }
  }, [userNumber, currentGuess]);
  useEffect(() => {
    minBoundarey = 1;
    maxBoundarey = 100;
  }, []);
  return (
    <View style={styles.screen}>
      <Title>Opponent guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Card>
          <Text style={styles.instructions}>Higher or Lower</Text>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("higher")}>
                <Ionicons name="add" size={24} color="white" />
              </PrimaryButton>
            </View>
            <View style={styles.buttonContainer}>
              <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                <Ionicons name="remove" size={24} color="white" />
              </PrimaryButton>
            </View>
          </View>
        </Card>
        <View style={styles.listContainer}>
          {/* {guessRounds.map((guessRound)=><Text key={guessRound} >{guessRound}</Text>)} */}
          <FlatList
            data={guessRounds}
            renderItem={(itemData) => (
              <GuessLogItem
                roundNumber={guessRounds.length - itemData.index}
                guess={itemData.item}
              />
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructions: {
    color: Colors.accent500,
    fontSize: 22,
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    height: "60%",
    padding: 16,
  },
});
