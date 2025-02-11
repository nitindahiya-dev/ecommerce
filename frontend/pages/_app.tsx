// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import Cookies from '../components/Cookies';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Retrieve the token and user data from localStorage on app mount.
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Pass the user (and setUser function if needed) via pageProps or context.
  return (
    <Provider store={store}>
      {/* Navbar */}
      <Navbar />

      <Component {...pageProps} user={user} setUser={setUser} />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <Cookies />
      {/* Footer */}
      <Footer />

    </Provider>
  );
}

export default MyApp;
