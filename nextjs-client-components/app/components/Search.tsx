"use client"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

export default function Search() {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch(search)
    router.push(`${search}`)
  }
  return (
    <form
      className="w-50 flex justify-center md:justify-between my-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white p-2 w-80 text-xl rounded-xl"
        placeholder="search"
      />
      <button className="p-2 text-xl rounded-xl ml-2 bg-slate-300">go 🚀</button>
    </form>
  )
}
