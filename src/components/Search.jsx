import { useState } from "react";

export default function Search({ action }) {
  const [term, setTerm] = useState("");

  function submit(e) {
    e.preventDefault();
    action(term);
    setTerm("");
  }

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        placeholder="Search by recipe category..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
    </form>
  );
}
