export default async function log(stack, level, pkg, message) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJoYXJzaC4yMnNjc2UxMDExMDgyQGdhbGdvdGlhc3VuaXZlcnNpdHkuZWR1LmluIiwiZXhwIjoxNzUxMDE1NjAzLCJpYXQiOjE3NTEwMTQ3MDMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI3NjE0NzZkNi00ODYzLTQyYTQtYmMwYy1iM2E1ZWFjNmVlYzkiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJoYXJzaCBrdW1hciIsInN1YiI6ImRjZmEzNzI4LTZhMWEtNGNmYi1hNDM3LTllMjVhNDllNzMwMCJ9LCJlbWFpbCI6ImhhcnNoLjIyc2NzZTEwMTEwODJAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJuYW1lIjoiaGFyc2gga3VtYXIiLCJyb2xsTm8iOiIyMjEzMTAxMTEwMiIsImFjY2Vzc0NvZGUiOiJNdWFndnEiLCJjbGllbnRJRCI6ImRjZmEzNzI4LTZhMWEtNGNmYi1hNDM3LTllMjVhNDllNzMwMCIsImNsaWVudFNlY3JldCI6IlVOZ0F4R1NVYUJ1ZHRBU0gifQ.q8M0aH0LddsbvBkbgh8qO-PesLMDC2HhpekhSHNTg7o";

  try {
    await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ stack, level, package: pkg, message }),
    });
  } catch (error) {
    console.error("Frontend log failed", error);
  }
}