import { Text, StyleSheet } from "react-native";


const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};
export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily:'open-sans-bold',
    fontSize: 18,
    // fontWeight: "bold",
    color: 'white',
    textAlign: "center",
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
    marginVertical:25
  },
});