import { NextResponse } from "next/server"

type Feedback = {
  name?: string
  email?: string
  message?: string
}

export async function POST(request: Request) {
  const requestData: Feedback = await request.json()
  console.log("requestData", requestData)

  //we can do some stuff here
  return NextResponse.json({ ...requestData, validated: true })
}
