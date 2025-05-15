import Button from "@components/Button"
import InputField from "@components/InputField"
import TitleWithSubtitle from "@components/TitleWithSubtitle"
import { useAuth } from "@context/authContext"
import { useTheme } from "@context/themeContext"
import { logo } from "@data/index"
import { Link, router } from "expo-router"
import React, { useState } from "react"
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    cPassword: "",
  })

  const { Colors } = useTheme()
  const { register } = useAuth()

  const onSubmit = async () => {
    setIsLoading(true)

    const res = await register(form)
    setIsLoading(false)

    if (!res?.success) {
      return Alert.alert("Login", res?.msg)
    }

    router.push("/user-verification")
  }

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      paddingVertical: 50,
      gap: 50,
    },
    img: {
      alignSelf: "center",
      height: 70,
      width: 150,
    },
    form: {
      gap: 20,
    },
  })

  return (
    <SafeAreaView
      style={{ flex: 1, height: "100%", backgroundColor: Colors.bg }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={styles.container}>
              <Image
                source={logo}
                resizeMode="contain"
                style={styles.img}
              />
              <View style={styles.form}>
                <TitleWithSubtitle
                  title="Get Started"
                  subtitle="by creating a free account."
                />
                <View style={{ gap: 15, flexDirection: "row" }}>
                  <InputField
                    title="First Name"
                    placeholder="First Name"
                    iconName="person-outline"
                    value={form.firstName}
                    onChange={(t) => setForm({ ...form, firstName: t })}
                  />
                  <InputField
                    title="Last Name"
                    placeholder="Last Name"
                    iconName="person-outline"
                    value={form.lastName}
                    onChange={(t) => setForm({ ...form, lastName: t })}
                  />
                </View>
                <InputField
                  title="E-mail"
                  placeholder="Enter your E-mail."
                  value={form.email}
                  onChange={(t) => setForm({ ...form, email: t })}
                  iconName="mail-outline"
                />
                <InputField
                  title="Password"
                  placeholder="Enter your password."
                  value={form.password}
                  onChange={(t) => setForm({ ...form, password: t })}
                  iconName="mail-outline"
                />
                <InputField
                  title="Confirm Password"
                  placeholder="Confirm the password."
                  value={form.cPassword}
                  onChange={(t) => setForm({ ...form, cPassword: t })}
                  iconName="mail-outline"
                />
                <Text style={{ color: Colors.text_sec, fontWeight: "500" }}>
                  Already have an Account?{" "}
                  <Link
                    style={{ color: Colors.p, fontWeight: "500" }}
                    href="/(auth)/login"
                  >
                    Login.
                  </Link>
                </Text>
                <Button
                  text="Register"
                  style={{
                    marginTop: 20,
                  }}
                  onPress={onSubmit}
                  disabled={isLoading}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Register
