import getWikiResults from "@/lib/getWikiResults"
import type { Metadata } from "next"
import WikiItem from "./components/WikiItem"

type Props = {
  params: {
    searchTerm: string
  }
}

export async function generateMetadata({
  params: { searchTerm },
}: Props): Promise<Metadata> {
  const wikiData = await getWikiResults(searchTerm)

  const normilizedSearchTerm = searchTerm.replaceAll("%20", "")

  if (!wikiData.query?.pages) {
    return { title: `${normilizedSearchTerm} not found` }
  }

  return {
    title: `${normilizedSearchTerm}`,
    description: `Search results for ${normilizedSearchTerm}`,
  }
}

export default async function SearchResults({ params: { searchTerm } }: Props) {
  //const wikiData: Promise<SearchResult> = getWikiResults(searchTerm)
  //const wiki = await wikiData
  const wikiData = await getWikiResults(searchTerm)

  const results: Result[] | undefined = wikiData?.query?.pages
  //const results: Result[] | undefined = wiki?.query?.pages

  return (
    <main className="bg-slate-200 mx-auto py-1 min-h-screen">
      {results ? (
        Object.values(results).map((result) => {
          console.log('result =>', result)
          //return <div key={result.pageid}>{JSON.stringify(result)}</div>
          return <WikiItem result={result} key={result.pageid} />
        })
      ) : (
        <h2 className="py-2 text-xl">{`${searchTerm} not found`}</h2>
      )}
    </main>
  )
}
