import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      onClick={() => setCount(count + 1)}
    >
      Clicks: {count}
    </button>
  );
}
