export default async function getWikiResults(
  searchTerm: string
): Promise<SearchResult> {
  console.log("searchTerm", searchTerm)
  const response = await fetch(
    `https://en.wikipedia.org/w/api.php?action=query&format=json&gsrsearch=${searchTerm}&generator=search&prop=pageimages|extracts`
  )

  return response.json()
}
