import { Stack } from "expo-router"
import React from "react"

const ProtectedLayout = () => {
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
