import { ChakraProvider } from '@chakra-ui/react'
import AppProvider from '../src/contexts/AppContext';

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </AppProvider>
  )
}

export default MyApp;