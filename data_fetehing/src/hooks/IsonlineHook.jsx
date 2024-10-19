import React, { useEffect, useState } from 'react';

function UseIsOnline() {
   const [isOnline, setIsOnline] = useState(navigator.onLine);

   useEffect(() => {
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      const intervalId = setInterval(() => {
         setIsOnline(navigator.onLine);
      }, 30000); 

      // Cleanup function
      return () => {
         window.removeEventListener('online', handleOnline);
         window.removeEventListener('offline', handleOffline);
         clearInterval(intervalId); 
      };
   }, []); 

   return isOnline;
}

export default UseIsOnline;
