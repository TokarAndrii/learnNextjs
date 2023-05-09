export default async function getUserById(
  userId: string
): Promise<User> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );
  //if (!res.ok) throw new Error("failed to fetch users");
  //TODO: fix return type
  //@ts-ignore
  if (!res.ok) return undefined;
  return res.json();
}
