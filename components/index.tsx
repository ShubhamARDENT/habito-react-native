import Home from "@/app/(Tabs)/Home";
import { StyleSheet, View } from "react-native";


export default function Page() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBar: {
    backgroundColor: "red",

  }
});
