import { NewGroup } from '@screens/NewGroup';
import theme from './src/theme';
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Loading } from '@components/Loading';

export default function App() {
  const [fontLoader] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  })

  return (
   
    <ThemeProvider theme={theme}>
      <StatusBar 
      barStyle='light-content'
      backgroundColor='transparent'
      translucent
      
      />
        {fontLoader ? <NewGroup/> : <Loading/>}
    </ThemeProvider>
   
  );
}