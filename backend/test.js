const test = async () => {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test User",
      email: "test3@example.com",
      password: "password123"
    })
  });
  console.log(res.status, await res.text());
};
test();
