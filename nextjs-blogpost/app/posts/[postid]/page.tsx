import { notFound } from "next/navigation"
import { getSortedPostsData, getPostData } from "@/lib/posts"
import type { Metadata } from "next"
import Link from "next/link"

export function generateStaticParams() {
  const posts = getSortedPostsData() //deduped!

  return posts.map((post) => ({
    postId: post.id,
  }))
}

export async function generateMetadata({
  params: { postid },
}: {
  params: { postid: string }
}): Promise<Metadata> {
  const posts = getSortedPostsData() //deduped!

  const post = posts.find((post) => post.id === postid)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  const { title, date } = await getPostData(postid)
  return {
    title,
    keywords: `post ${title}, issued at ${date}`,
  }
}

export default async function SinglePost({
  params,
}: {
  params: { postid: string }
}) {
  const { postid } = params
  const allSortedPosts = getSortedPostsData()
  if (!allSortedPosts.find((post) => post.id === postid)) {
    return notFound()
  }

  const { title, date, contentHtml } = await getPostData(postid)
  return (
    <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
      <h1 className="text-3xl mt-4 mb-0">{title}</h1>
      <p className="my-2 mx-0">{date}</p>
      <article>
        <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
        <p className="mt-2">
          <Link href="/">← Back to home</Link>
        </p>
      </article>
    </main>
  )
}
