import type { Metadata } from "next";

//static metadata
export const metadata: Metadata = {
  title: 'About',
  description: 'about page description',
}

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full">
        <h1>About page</h1>
      </div>
    </main>
  );
}
