"use client"

import { FormEvent, useState } from "react"

export default function Home() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: FormEvent) => {
    console.log("name", name)
    console.log("email", email)
    console.log("message", message)
    e.preventDefault()
    //request to our api/feedback route
    const result = await fetch("http://localhost:3000/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    })
    const res = await result.json()
    console.log("res", res)
  }
  return (
    <main className="p-24 h-full">
      <h1 className="pb-2 text-center font-bold">Send feedback form</h1>
      <form className="flex flex-col " onSubmit={handleSubmit}>
        <div className="flex justify-start items-center">
          <label className="w-60 inline-block" htmlFor="name">
            Name
          </label>
          <input
            name="name"
            type="text"
            value={name}
            placeholder="enter name"
            className="mt-2 ml-2 bg-white p-2 w-80 text-xl rounded-xl"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex justify-start items-center">
          <label className="w-60 inline-block" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={email}
            placeholder="enter email"
            className="mt-2 ml-2 bg-white p-2 w-80 text-xl rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex justify-start items-center">
          <label className="w-60 inline-block" htmlFor="message">
            Message
          </label>
          <textarea
            name="message"
            value={message}
            placeholder="enter message"
            className="mt-2 ml-2 bg-white p-2 w-80 text-xl rounded-xl"
            cols={10}
            rows={8}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex justify-center items-center">
          <button
            className="mt-5 ml-2 bg-slate-500 p-2 w-80 text-xl rounded-xl"
            type="submit"
          >
            Send feedback
          </button>
        </div>
      </form>
    </main>
  )
}
