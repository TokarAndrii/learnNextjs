export default async function getAllUsers(): Promise<User[]> {
  //import "server-only";
  //Then import the package into any module that contains server-only code:
  
  //The corresponding package client-only can be used to mark modules that contain client-only code – for example, 
  //code that accesses the window object.

  const res = await fetch(
    "https://jsonplaceholder.typicode.com/users"
    //example of passing extra data
    // {
    //   headers: {
    //     authorization: process.env.API_KEY,
    //   },
    // }
  );
  if (!res.ok) throw new Error("failed to fetch users");
  return res.json();
}
