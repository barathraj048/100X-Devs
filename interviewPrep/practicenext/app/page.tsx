"use client" 

import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/clicked");
      
      setData(response.data.message); 
      alert(response.data.message);
    } catch (error) {
      console.error("Failed to fetch", error);
      alert("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={handleClick} 
        disabled={isLoading}
        className="bg-black text-white border-amber-50 p-2 rounded"
      > 
        {isLoading ? "Fetching..." : "Click Meee!!!!!....."}
      </button>
      
      {data && <p className="mt-4">Server says: {data}</p>}
    </div>
  );
}