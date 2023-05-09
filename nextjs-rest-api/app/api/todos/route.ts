import { NextResponse } from "next/server"

const dataSourceUrl = process.env.DATA_SOURCE_URL as string
const apiKey = process.env.DATA_API_KEY

export async function GET(request: Request) {
  console.log("GET todos")
  const res = await fetch(dataSourceUrl)
  const todos: Todo[] = await res.json()

  const origin = request.headers.get("origin")

  //return NextResponse.json(todos)

  return new NextResponse(JSON.stringify(todos), {
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Content-Type": "application/json",
    },
  })
}

export async function DELETE(request: Request) {
  const { id } = await request.json()

  if (!id) {
    return NextResponse.json({ message: "id should be provided" })
  }

  await fetch(`dataSourceUrl/${id}`, {
    method: "DELETE",
    headers: {
      headers: {
        "Content-Type": "application/json",
        "API-Key": apiKey,
      },
    },
  })

  return NextResponse.json({ message: `Todo with ID ${id} deleted` })
}

export async function POST(request: Request) {
  const { title, completed, userId } = await request.json()

  if (!title || typeof completed === "undefined" || !userId)
    return NextResponse.json({ message: "Missing required data" })

  const res = await fetch(dataSourceUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": apiKey,
    },
    body: JSON.stringify({
      userId,
      title,
      completed,
      id: Date.now(),
    }),
  })

  const newTodo: Todo = await res.json()

  return NextResponse.json(newTodo)
}

export async function PUT(request: Request) {
  const { userId, id, title, completed }: Todo = await request.json()

  if (!userId || !id || !title || typeof completed !== "boolean")
    return NextResponse.json({ message: "Missing required data" })

  const res = await fetch(`${dataSourceUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "API-Key": apiKey,
    },
    body: JSON.stringify({
      userId,
      title,
      completed,
    }),
  })

  const updatedTodo: Todo = await res.json()

  return NextResponse.json(updatedTodo)
}
