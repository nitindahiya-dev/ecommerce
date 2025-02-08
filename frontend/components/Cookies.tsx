import React, { useState, useEffect } from 'react';

const Cookies = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const decisionMade = sessionStorage.getItem('cookiesDecision');
    

    
    if (!cookiesAccepted && !decisionMade) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    sessionStorage.setItem('cookiesDecision', 'true');
    setShowBanner(false);
  };

  const handleDecline = () => {
    sessionStorage.setItem('cookiesDecision', 'false');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-3 left-5 right-5 rounded-xl bg-gray-200 p-4 border-t border-gray-300 flex flex-col sm:flex-row items-center justify-between z-50">
      <div className="text-sm text-gray-700 mb-2 sm:mb-0 sm:max-w-2xl">
        We use cookies to enhance your experience, including remembering your login details. 
        <br />
        By accepting, you agree to our use of cookies. 
        <a href="/privacy" className="text-[var(--primary)] hover:underline ml-1">
          Privacy Policy
        </a>
      </div>
      <div className="flex gap-2 w-full sm:w-auto">
        <button
          onClick={handleDecline}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 w-full sm:w-auto"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 text-sm font-medium text-white bg-[var(--primary)] rounded-md hover:bg-[var(--primary-dark)] hover:text-[var(--primary)] hover:outline hover:outline-1 w-full sm:w-auto"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default Cookies;