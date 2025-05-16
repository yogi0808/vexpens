import AvoidKeyboard from "@components/AvoidKeyboard"
import Button from "@components/Button"
import DropDown from "@components/DropDown"
import InputField from "@components/InputField"
import TitleWithSubtitle from "@components/TitleWithSubtitle"
import { useAuth } from "@context/authContext"
import { dropdownDataForExpenseLog } from "@data/index"
import { validateData } from "@utils/utils"
import { useLocalSearchParams } from "expo-router"
import { serverTimestamp } from "firebase/firestore"
import React, { useState } from "react"
import { Alert, View } from "react-native"
import useUploadData from "../../hooks/useUploadData"

const AddLogs = () => {
  const { vehicleId, incomeGenerating } = useLocalSearchParams()
  const { user } = useAuth()

  const { loading, createDocument } = useUploadData()

  const [form, setForm] = useState({
    vehicleId: vehicleId,
    userUid: user?.uid,
    type: incomeGenerating !== "true" ? "expense" : "",
    amount: "",
    category: "",
    description: "",
  })

  const onSubmit = async () => {
    const isValid = validateData("log", form)
    if (isValid !== true) {
      return Alert.alert("Add Log", isValid.toString())
    }

    const res = await createDocument("logs", {
      vehicleId: form.vehicleId,
      userUid: form.userUid,
      type: form.type,
      amount: parseInt(form.amount),
      category: form.category,
      description: form.description,
      createdAt: serverTimestamp(),
    })

    if (!res.success) {
      return Alert.alert("Add Log", res.msg)
    }

    Alert.alert("Add Log", "Log Added Successfully.")
    setForm((priv) => ({
      ...priv,
      type: incomeGenerating !== "true" ? "expense" : "",
      amount: "",
      category: "",
      description: "",
    }))
  }

  return (
    <AvoidKeyboard>
      <View style={{ paddingVertical: 50, gap: 20 }}>
        <TitleWithSubtitle
          title="Add Log"
          subtitle="Enter your Log details below."
        />
        <DropDown
          dropdownData={
            incomeGenerating === "true"
              ? [
                  { label: "Income", value: "income" },
                  { label: "Expense", value: "expense" },
                ]
              : [{ label: "Expense", value: "expense" }]
          }
          title="Type"
          placeholder="Select Type"
          value={form.type}
          onChange={(item) => setForm({ ...form, type: item.value })}
        />
        <InputField
          title="Amount"
          placeholder="Enter the Amount"
          value={form.amount}
          onChange={(t) => setForm({ ...form, amount: t })}
          iconName="cash-outline"
          number
        />
        {form.type === "expense" && (
          <DropDown
            dropdownData={dropdownDataForExpenseLog}
            title="Expense Category"
            placeholder="Select Category"
            value={form.category}
            onChange={(item) => setForm({ ...form, category: item.value })}
          />
        )}
        <InputField
          title="Description (optional)"
          placeholder="Enter your Description."
          value={form.description}
          onChange={(t) => setForm({ ...form, description: t })}
          iconName="document-outline"
          multiline
        />

        <Button
          text="Add Log"
          style={{
            marginTop: 20,
          }}
          onPress={onSubmit}
          disabled={loading}
        />
      </View>
    </AvoidKeyboard>
  )
}

export default AddLogs
