export async function generateContent(tags: string[]) {
  try {
    const response = await fetch('https://syntechgeneratorapi--lemon.vercel.app/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tags })
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0]?.message?.content) {
      throw new Error('Invalid response from OpenAI');
    }

    return data.choices[0].message.content;
  } catch (error: any) {
    console.error("Error generating content:", error.message);
    throw error;
  }
}
