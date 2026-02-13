"use client";

import { useEffect, useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [dark, setDark] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = saved ? saved === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loaded]);

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: trimmed, completed: false },
    ]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && editingId !== null) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, text: trimmed } : todo
        )
      );
    }
    setEditingId(null);
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (dragIndex === null || dragIndex === index) return;
    const updated = [...todos];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    setTodos(updated);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-zinc-50 pt-20 dark:bg-zinc-950">
      <main className="w-full max-w-lg px-4">
        <div className="mb-8 flex items-center justify-center gap-3">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            Todo App
          </h1>
          <button
            onClick={toggleDark}
            className="rounded-lg border border-zinc-300 p-2 text-xl hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
            aria-label="다크모드 토글"
          >
            {dark ? "\u2600\uFE0F" : "\uD83C\uDF19"}
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder="할 일을 입력하세요"
            className="flex-1 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
          />
          <button
            onClick={addTodo}
            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 active:bg-blue-800"
          >
            추가
          </button>
        </div>

        {todos.length > 0 && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              완료 {todos.filter((t) => t.completed).length} / 전체 {todos.length}
            </p>
            <button
              onClick={() => setTodos([])}
              className="rounded px-2 py-1 text-sm text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950"
            >
              전체 삭제
            </button>
          </div>
        )}

        <ul className="mt-4 space-y-2">
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              draggable={editingId !== todo.id}
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 rounded-lg border bg-white px-4 py-3 dark:bg-zinc-800 ${
                dragOverIndex === index && dragIndex !== index
                  ? "border-blue-400 dark:border-blue-500"
                  : "border-zinc-200 dark:border-zinc-700"
              } ${dragIndex === index ? "opacity-50" : ""} cursor-grab active:cursor-grabbing`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-5 w-5 cursor-pointer accent-blue-600"
              />
              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit();
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  onBlur={saveEdit}
                  autoFocus
                  className="flex-1 rounded border border-blue-400 bg-transparent px-2 py-0.5 text-zinc-900 focus:outline-none dark:text-zinc-100"
                />
              ) : (
                <span
                  onDoubleClick={() => startEdit(todo)}
                  className={`flex-1 cursor-pointer ${
                    todo.completed
                      ? "text-zinc-400 line-through"
                      : "text-zinc-900 dark:text-zinc-100"
                  }`}
                >
                  {todo.text}
                </span>
              )}
              <button
                onClick={() => deleteTodo(todo.id)}
                className="rounded px-2 py-1 text-sm text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950"
              >
                삭제
              </button>
            </li>
          ))}
        </ul>

        {todos.length === 0 && (
          <p className="mt-8 text-center text-zinc-400">
            아직 할 일이 없습니다. 위에서 추가해보세요!
          </p>
        )}
      </main>
    </div>
  );
}
