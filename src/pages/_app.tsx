import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { AppProps } from 'next/app';
import { Header } from '../components/Header';

import '../styles/global.scss';

const initialOptions = {
  'client-id': 'AXIM_FXxxdmOHs8EEvrE2Xoh3FFiwHHAz3fQ9UUk5nslemayJp9TBNlMs93bAO05EN2XmZhmR7owQLSy',
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
