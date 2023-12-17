import { StyleSheet, Text } from "react-native";
import Colors from "../../constants/colors";
const InstructionText = ({children, style}) =>{
    return <Text style={[styles.instructions,style]}>{children}</Text>
}

export default InstructionText;

const styles = StyleSheet.create({
    
    instructions:{
        fontFamily:'open-sans',
        color: Colors.accent500,
        fontSize:22
    },
})