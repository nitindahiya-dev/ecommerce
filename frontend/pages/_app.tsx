// frontend/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}

export default MyApp;
