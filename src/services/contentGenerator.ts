export async function generateContent(tags: string[]) {
  const response = await fetch("https://syntechgeneratorapi--lemon.vercel.app/api/generate
", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tags }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || "";
}
