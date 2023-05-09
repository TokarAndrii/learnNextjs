export default async function getUserPosts(userId: string): Promise<Post[]> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );
  if (!res.ok) throw new Error("failed to fetch users");
  return res.json();
}
