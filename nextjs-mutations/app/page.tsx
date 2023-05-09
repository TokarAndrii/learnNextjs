import TodoList from "./components/TodoList"
import AddTodo from "./components/AddTodo"
import Navbar from "./components/Navbar"

export const revalidate = 0

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-4/5 p-5">
        <AddTodo />
        {/* @ts-expect-error Server Component */}
        <TodoList />
      </main>
    </>
  )
}
