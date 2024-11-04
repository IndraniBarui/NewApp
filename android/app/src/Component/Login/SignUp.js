import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React,{useState} from "react";
import Background from "./Background";
import Feild from "./Feild";
import Btn from "./Btn";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import axiosInstance from "../../axiosIntance";
const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
let json=JSON.stringify({
  firstName,
  lastName,
  email,
  contactNumber,
  password,
})
  const handleSignUp = async () => {
    try {
      const response = await axiosInstance.post(`/signUp`, json);
      console.log(response,"response")
      if (response.status === 200) {
        alert("Success", "Account created");
        navigation.navigate("LoginPage");
      } else {
       alert("Error", "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error)
     alert("Error", "Failed to create account. Please try again.");
    }
  };
  return (
    <View>
      <Background>
        <View style={{ alignItems: "center", width: 420 }}>
          <Text style={styles.textStyle}>Register</Text>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 20,
            }}
          >
            Create a new account
          </Text>
          <View style={styles.backStyle}>
            <View style={styles.placeStyle}>
             
                 <Feild placeholder="First name" value={firstName} onChangeText={setFirstName} />
              <Feild placeholder="Last name" value={lastName} onChangeText={setLastName} />
              <Feild placeholder="Email/Username" value={email} onChangeText={setEmail} />
              <Feild placeholder="Contact Number" value={contactNumber} onChangeText={setContactNumber} />
              <Feild placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword} />
              
            </View>
            {/* <View style={styles.forgetContainer}>
              <Text style={styles.forgetText}>Forgot your password ?</Text>
            </View> */}
            <View style={{ marginTop: "50%" }}>
              <Btn
                btnLabel="Signup"
                bgColor="black"
                textColor="white"
                // width={"65%"}
                // Press={() => {
                //   alert("Account created");
                //   navigation.navigate("LoginPage");
                // }}
                Press={handleSignUp}
              ></Btn>
            </View>
            <View style={styles.accountContainer}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Already have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("LoginPage")}
              >
                <Text
                  style={{ fontSize: 18, color: "#f7642e", fontWeight: "bold" }}
                >
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Background>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  textStyle: {
    color: "black",
    fontSize: 65,
    fontWeight: "bold",
    // marginVertical: 10,
    marginTop: 20,
  },
  backStyle: {
    backgroundColor: "white",
    height: 700,
    borderTopLeftRadius: 130,
    width: 460,
    padding: 100,
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#f7642e",
    textAlign: "center",

    marginRight: 21,
  },
  loginText: {
    color: "#676261",
    fontWeight: "bold",
    fontSize: 22,
    marginTop: 8,
    marginRight: 21,
  },
  placeStyle: {
    width: "160%",
    marginLeft: 80,
    marginTop: 60,
    
  },
  forgetContainer: {
    width: "78%",
    alignItems: "flex-end",
    marginLeft: 100,
    marginTop: 15,
  },
  forgetText: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#f7642e",
  },
  accountContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
});
