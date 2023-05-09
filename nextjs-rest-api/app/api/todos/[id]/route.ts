import { NextResponse } from "next/server"

type Props = {
  params: {
    id: string
  }
}

const dataSourceUrl = process.env.DATA_SOURCE_URL as string

export async function GET(request: Request, { params: { id } }: Props) {
  //alternative way get ID
  //const id = request.url.split("/").at(-1)

  const todo = await (await fetch(`${dataSourceUrl}/${id}`)).json()

  return NextResponse.json(todo)
}
