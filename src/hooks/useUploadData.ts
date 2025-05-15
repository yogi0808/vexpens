import { addDoc, collection, DocumentData, WithFieldValue } from "firebase/firestore"
import { useState } from "react"
import { firestore } from "../../firebaseConfig"

const useUploadData = <T extends DocumentData>() => {
    const [loading, setLoading] = useState<boolean>(false)

    const createDocument = async (collectionName: string, data: WithFieldValue<T>): Promise<{ success: boolean, msg?: string }> => {
        setLoading(true)

        try {
            const docRef = await addDoc(collection(firestore, collectionName), data);
            setLoading(false)
            return { success: true }
        } catch (e: any) {
            const msg = e.message
            setLoading(false)
            return { success: false, msg }

        }
    }

    return { loading, createDocument }
}

export default useUploadData