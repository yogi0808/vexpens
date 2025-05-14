import { useAuth } from "@context/authContext"
import { Redirect, Stack } from "expo-router"
import React from "react"

const ProtectedLayout = () => {
  const { isReady, alreadyLaunched, isLoggedIn } = useAuth()

  console.log("isReady:", isReady)
  console.log("alreadyLaunched:", alreadyLaunched)
  console.log("isLoggedIn:", isLoggedIn)

  if (!isReady) return null

  if (!alreadyLaunched && !isLoggedIn) {
    return <Redirect href="/on-boarding" />
  } else if (!isLoggedIn && alreadyLaunched) {
    return <Redirect href="/login" />
  }

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="add-vehicles"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="add-logs"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="vehicle/[id]"
        options={{ headerShown: false }}
      />
    </Stack>
  )
}

export default ProtectedLayout
