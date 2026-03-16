const BASE = import.meta.env.VITE_API_URL;

export async function registerUser(data: {
  username: string;
  email: string;
  password: string;
  role: string;
}) {
  const res = await fetch(`${BASE}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw await res.json();
  return res.json();
}

export async function loginUser(data: {
  email: string;
  password: string;
}) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw await res.json();
  return res.json();
}