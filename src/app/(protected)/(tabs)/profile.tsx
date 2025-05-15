import Button from "@components/Button"
import { useAuth } from "@context/authContext"
import React from "react"
import { Text, View } from "react-native"

const Profile = () => {
  const { logOut } = useAuth()

  return (
    <View>
      <Text>Profile</Text>
      <Button
        text="Logout"
        onPress={logOut}
      />
    </View>
  )
}

export default Profile
