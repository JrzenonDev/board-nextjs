import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { AppProps } from 'next/app';
import { Header } from '../components/Header';

import '../styles/global.scss';

const initialOptions = {
  'client-id': 'AcI-iIfdrMQX3LC5e-meAyUs6uug3AVc3kKi-SADB888VXPL0W6jdY7s_RnzsWVMcSgniYqA1TFC8MDe',
  currency: 'BRL',
  intent: 'capture'
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <PayPalScriptProvider options={initialOptions}>
        <Header />
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </NextAuthProvider>
  );
}

export default MyApp;
