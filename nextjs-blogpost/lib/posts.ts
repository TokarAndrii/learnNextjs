import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "blogposts")

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const matterResult = matter(
      fs.readFileSync(path.join(postsDirectory, fileName), "utf8")
    )

    const blogPost: Blogpost = {
      id: fileName.replace(/\.md$/, ""),
      title: matterResult.data.title,
      date: matterResult.data.date,
    }

    return blogPost
  })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostData(id: string) {
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(
    fs.readFileSync(path.join(postsDirectory, `${id}.md`), "utf8")
  )

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  const blogPostWithHTML: Blogpost & { contentHtml: string } = {
    id,
    title: matterResult.data.title,
    date: matterResult.data.date,
    contentHtml,
  }

  // Combine the data with the id
  return blogPostWithHTML
}
