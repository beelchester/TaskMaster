import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Page from './src/screens/Page';
import {theme} from './src/theme';
import {ThemeProvider} from '@rneui/themed';
import BottomBar from './src/components/BottomBar';
export default function App() {
  return (
    <ThemeProvider theme={theme}>
    <View style={styles.container}>
      <Page/>
      <BottomBar/>
      <StatusBar style="auto" />
    </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(28, 28, 28)',
    // paddingTop: 50,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
