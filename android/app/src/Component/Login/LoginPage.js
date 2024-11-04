import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Background from "./Background";
import Feild from "./Feild";
import Btn from "./Btn";
import { useNavigation } from "@react-navigation/native";
import ToastMessage from "./ToastMessage";
import axiosInstance from "../../axiosIntance";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthData } from "../Redux/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LoginPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [toastVisible, setToastVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  // };
  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handleLogin =()=>{

  //   // setTimeout(() => {
  //   //   setToastVisible(false);
  //   // }, 5000);

  //   setTimeout(() => {
  //     navigation.navigate("HOME");
  //     setToastVisible(true);
  //   }, 4000);
  // }
  let json = JSON.stringify({
    email,

    password,
  });

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post(`/signIn`, json);
      console.log(response, "response");
      if (response.status === 200) {
        const { token, user } = response.data;
        await AsyncStorage.setItem("token", token);

        // Dispatch token and user to Redux
        dispatch(setAuthData({ token, user }));
        console.log("tokentokentoken",response.data.token)
        alert("Success", "Account created");
        navigation.navigate("HOME_STACK");
      } else {
        alert("Error", "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("Error", "Failed to create account. Please try again.");
    }
  };



  return (
    <View style={{ flex: 1 }}>
      <Background>
        {toastVisible && (
          <ToastMessage
            type="success"
            text="Logged in"
            description="Welcome Home!!"
          />
        )}
        <View style={{ alignItems: "center", width: 420 }}>
          <Text style={styles.textStyle}>Login</Text>
          <View style={styles.backStyle}>
            <Text style={styles.text}>Welcome Back!!!</Text>
            <Text style={styles.loginText}>Login to your account!!!</Text>
            <View style={styles.placeStyle}>
            <Feild placeholder="Email/Username" value={email} onChangeText={setEmail} />
              <View style={{ marginTop: 10 }}>
              <Feild placeholder="Password" secureTextEntry={true} value={password} onChangeText={setPassword} />
              </View>
            </View>
            <View style={styles.forgetContainer}>
              <Text style={styles.forgetText}>Forgot your password ?</Text>
            </View>
            <View style={{ marginTop: "50%" }}>
              <Btn
                btnLabel="Login"
                bgColor="black"
                textColor="white"
                Press={handleLogin}
              ></Btn>
            </View>
            <View style={styles.accountContainer}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text
                  style={{ fontSize: 18, color: "#f7642e", fontWeight: "bold" }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Background>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  textStyle: {
    color: "black",
    fontSize: 65,
    fontWeight: "bold",
    marginVertical: 10,
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
