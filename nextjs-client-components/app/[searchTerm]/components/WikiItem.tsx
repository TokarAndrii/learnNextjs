import Link from "next/link"

type Props = {
  result: Result
}

export default function WikiItem({ result }: Props) {
  const wikiItemTextCol = (
    <div className="flex flex-col justify-center">
      <h2>
        <Link
          href={`https://en.wikipedia.org/?${result.pageid}`}
          target="_blank"
        >
          {result.title}
        </Link>
      </h2>
      <p>{result.extract}</p>
    </div>
  )

  const content = result?.thumbnail?.source ? (
    <article className="m-4 max-w-lg">
      <div className="flex flex-row gap-4">
        <div className="flex flex-col justify-center">
          <img
            src={result.thumbnail.source}
            alt={result.title}
            width={result.thumbnail.width}
            height={result.thumbnail.height}
            loading="lazy"
          />
        </div>
        {wikiItemTextCol}
      </div>
    </article>
  ) : (
    <article className="m-4 max-w-lg">{wikiItemTextCol}</article>
  )

  return content
}
