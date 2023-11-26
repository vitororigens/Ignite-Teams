import { Groups } from '@screens/Groups';
import theme from './src/theme';
import { ThemeProvider } from 'styled-components';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { ActivityIndicator } from 'react-native';
import { Loading } from '@components/Loading';

export default function App() {
  const [fontLoader] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
   
    <ThemeProvider theme={theme}>
        {!fontLoader ? <Groups/> : <Loading/>}
    </ThemeProvider>
   
  );
}