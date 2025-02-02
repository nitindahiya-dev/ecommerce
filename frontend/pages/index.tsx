// frontend/pages/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='relative bg-background'>
      <Navbar />
      <h1 className="text-3xl font-bold text-black font-cardo">E-commerce Site</h1>
      <p className="mt-4">{message}</p>
    </div>
  );
}
