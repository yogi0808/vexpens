import Button from "@components/Button"
import { useAuth } from "@context/authContext"
import { useTheme } from "@context/themeContext"
import { router } from "expo-router"
import React, { useEffect, useState } from "react"
import { Alert, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { auth } from "../../../firebaseConfig"

const UserVerification = () => {
  const [timeLeft, setTimeLeft] = useState(120)
  const [canResand, setCanResend] = useState(false)

  const { Colors } = useTheme()
  const { sendVerificationEmail, setEmailVerified } = useAuth()

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true)
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  useEffect(() => {
    const interval = setInterval(async () => {
      const user = auth.currentUser
      if (user) {
        await user.reload()
        if (user.emailVerified) {
          clearInterval(interval)
          setEmailVerified()
          router.replace("/")
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const resendMail = async () => {
    const res = await sendVerificationEmail(auth.currentUser)

    if (!res?.success) Alert.alert("Resend email", res?.msg)
    setTimeLeft(0)

    Alert.alert("Resend email", "Email Send successfully.")

    console.log("resend email")
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.bg,
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 50,
        }}
      >
        <Text
          style={{
            color: Colors.text_prim,
            fontSize: 28,
            fontWeight: "700",
            textAlign: "center",
            marginBottom: 16,
          }}
        >
          Verify Your Email
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "400",
            textAlign: "center",
            lineHeight: 22,
            color: Colors.text_sec,
            marginBottom: 16,
          }}
        >
          We’ve sent a verification link to your email address. Please check
          your inbox and verify to continue.
        </Text>
        {canResand ? (
          <Button
            text="Resand Email"
            onPress={resendMail}
          />
        ) : (
          <Text
            style={{ fontSize: 16, color: Colors.text_tert, marginTop: 12 }}
          >
            You can resend in {timeLeft}
          </Text>
        )}
      </View>
    </SafeAreaView>
  )
}

export default UserVerification
