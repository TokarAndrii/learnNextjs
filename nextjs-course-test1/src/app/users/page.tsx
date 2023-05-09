import type { Metadata } from "next";
import Link from "next/link";
import getAllUsers from "@/libs/getAllUsers";

export const metadata: Metadata = {
  title: "Users",
};

async function Users() {
  const usersData: Promise<User[]> = getAllUsers();
  const users = await usersData;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="pt-5 w-full">
        <h2>Users</h2>
        {users.map((user) => {
          return (
            <div key={user.id} className="flex justify-items-start pt-1">
              <Link className="px-2 underline decoration-blue-700" href={`users/${user.id}`}>
                {user.name}
              </Link>
              <p className="pl-2">{user.email}</p>
              <p className="pl-2">{user.phone}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Users;
