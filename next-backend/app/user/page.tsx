import client from '@/db'

export const BackendFetch = async () => {
  try {
     const user=await client.user.findFirst()
       return ( user)
  } catch (err) {
    console.error(err);
  }
};

export default async function User() {
  const response = await BackendFetch();

  return (
    <div>
      <p>Name: {response?.username}</p>
      <p>Email: {response?.passwors}</p>
    </div>
  );
}
