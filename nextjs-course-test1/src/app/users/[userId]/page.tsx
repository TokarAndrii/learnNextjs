import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import getUserById from "@/libs/getUserById";
import getUserPosts from "@/libs/getUserPosts";
import getAllUsers from "@/libs/getAllUsers";

type Params = {
  params: {
    userId: string;
  };
};

//Dynamic metadata
export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  const userData: Promise<User> = getUserById(userId);

  const user = await userData;

  if (!user) {
    return {
      title: "user does not exist",
    };
  }

  return {
    title: `${user.name} `,
    description: `${user.name} details page with email ${user.email}`,
  };
}

export default async function UserDetailsPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUserById(userId);
  const userPostsData: Promise<Post[]> = getUserPosts(userId);

  const [user, userPosts] = await Promise.all([userData, userPostsData]);

  if (!user) {
    return notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="pt-5 w-full">
        <h2>User Details Page {userId}</h2>
        <div className="flex flex-col justify-items-start pt-2">
          <h3>User personal info</h3>
          <p className="pl-2">ID: {user.id}</p>
          <p className="pl-2">Name: {user.name}</p>
          <p className="pl-2">Email: {user.email}</p>
          <p className="pl-2">Phone: {user.phone}</p>
        </div>
        <div>
          <h3>User posts</h3>
          <Suspense fallback={<h2>Loading user posts ...</h2>}>
            {userPosts.map((post) => {
              return (
                <div key={post.id} className="flex justify-items-start pt-1">
                  <p className="pl-2">{post.id}</p>
                  <Link
                    className="px-2 underline decoration-blue-700"
                    href={`posts/${post.id}`}
                  >
                    {post.title}
                  </Link>
                  <p className="pl-2">{post.body}</p>
                </div>
              );
            })}
          </Suspense>
        </div>
      </section>
    </main>
  );
}

/**
 * The generateStaticParams function can be used in combination with dynamic route segments
 * to statically generate routes at build time instead of on-demand at request time.
 */
export async function generateStaticParams() {
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;

  //userId -> string User.id is number
  return users.map((user) => ({ userId: user.id.toString() }));
}
