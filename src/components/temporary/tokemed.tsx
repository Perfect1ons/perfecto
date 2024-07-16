"use client";
import { useState } from "react";

export default function TokenForm() {
  const [number, setNumber] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const response = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ accessToken: token }), // Отправляем токен как accessToken
    });

    const data = await response.json();
    console.log(data);

    setMessage(data.message || data.error);
  };

  const handleDelete = async () => {
    const response = await fetch("/api/auth", {
      method: "DELETE",
    });

    const data = await response.json();
    setMessage(data.message || data.error);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Number:
            <input
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Token:
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
      {message && <p>{message} dtdt</p>}
    </div>
  );
}
