import axios from "axios";
import { Suspense } from "react";
import Loading from "./loading";

export const BackendFetch = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/user"
    );
    return response.data; 
  } catch (err) {
    console.error(err);

  }
};

export default async function User() {
  const response = await BackendFetch();

  return (
    <div>
      <p>Name: {response.name}</p>
      <p>Email: {response.email}</p>
    </div>
  );
}
