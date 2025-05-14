import Button from "@components/Button"
import { ThemeContext } from "@context/themeContext"
import React, { useContext, useEffect, useState } from "react"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const UserVerification = () => {
  const [timeLeft, setTimeLeft] = useState(120)
  const [canResand, setCanResend] = useState(false)

  const { Colors } = useContext(ThemeContext)

  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true)
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const onContinue = () => {
    console.log("Continue.")
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
            onPress={onContinue}
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
