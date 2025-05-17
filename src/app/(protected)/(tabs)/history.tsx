import LogSectionTitle from "@components/LogSectionTitle"
import LogTileForHistory from "@components/LogTileForHistory"
import { useAuth } from "@context/authContext"
import { useTheme } from "@context/themeContext"
import React, { useEffect } from "react"
import { ActivityIndicator, SectionList, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import useGetLogs from "../../../hooks/useGetLogs"

const History = () => {
  const { Colors } = useTheme()
  const { user } = useAuth()

  const { loading, refreshing, reload, fetchNext, sections, hasMore } =
    useGetLogs({ userUid: user?.uid })

  useEffect(() => {
    fetchNext()
  }, [user])
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.bg }}>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 28,
          color: Colors.text_prim,
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        History
      </Text>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.uid || ""}
        renderItem={({ item }) => <LogTileForHistory log={item} />}
        renderSectionHeader={({
          section: { title, totalExpense, totalIncome },
        }) => (
          <LogSectionTitle
            title={title}
            totalExpense={totalExpense}
            totalIncome={totalIncome}
            incomeGenerating={true}
          />
        )}
        ListFooterComponent={() =>
          loading ? (
            <ActivityIndicator
              size="large"
              color={Colors.p}
            />
          ) : null
        }
        onEndReachedThreshold={0.2}
        onEndReached={() => {
          if (!loading && hasMore) {
            fetchNext()
          }
        }}
        ListEmptyComponent={() => (
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              fontWeight: "bold",
              color: Colors.text_sec,
              opacity: 0.2,
            }}
          >
            No Log Found.
          </Text>
        )}
        refreshing={refreshing}
        onRefresh={reload}
      />
    </SafeAreaView>
  )
}

export default History
