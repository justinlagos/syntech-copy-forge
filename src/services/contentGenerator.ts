export async function generateContent(tags: string[] = []) {
  try {
    const response = await fetch('https://syntech-copyforge-server-v2.vercel.app/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tags }),
    });

    if (!response.ok) {
      throw new Error(`❌ Server returned ${response.status}`);
    }

    const data = await response.json();

    // Defensive check in case OpenAI response is malformed
    if (!data?.choices?.[0]?.message?.content) {
      throw new Error('No content returned from OpenAI.');
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error('[generateContent error]', error);
    throw error;
  }
}
