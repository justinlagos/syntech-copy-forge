
import { ContentPair } from "@/components/ContentDisplay";

const generatePrompt = (topics: string[]): string => {
  const topicLabels = topics.map(topic => {
    switch (topic) {
      case "scope3": return "Scope 3 Emissions";
      case "carbon": return "Carbon Reduction";
      case "madeInUK": return "Made in UK";
      case "sustainable": return "Sustainable Construction";
      case "renewable": return "Renewable Energy";
      case "syntechASB": return "Syntech ASB";
      case "innovation": return "Biofuel Innovation";
      case "circular": return "Circular Economy";
      case "netZero": return "Net Zero";
      default: return topic;
    }
  });

  return `
  You are a world-class UK copywriter for Syntech Biofuel. Generate 5 social media headline + subheadline pairs for LinkedIn and Instagram. Focus on these topics: ${topicLabels.join(", ")}.

  Tone: Corporate, Clean, British English, Like BP/Shell.
  Avoid the word 'revolutionise'. No fluff.

  Use this format:
  Headline
  Subheadline

  Add a 6th funny but serious option.
  `;
};

const parseAIResponse = (response: string): ContentPair[] => {
  const contentPairs: ContentPair[] = [];
  
  // Split the response by double newlines to separate each headline/subheadline pair
  const pairs = response.split(/\n\n+/);
  
  pairs.forEach((pair, index) => {
    // Split each pair into headline and subheadline
    const lines = pair.split(/\n/);
    
    if (lines.length >= 2) {
      const headline = lines[0].replace(/^[0-9]+\.\s*/, ''); // Remove any numbering
      const subheadline = lines[1];
      
      contentPairs.push({
        headline,
        subheadline,
        isFunny: index === pairs.length - 1 // Last pair is the funny one
      });
    }
  });
  
  return contentPairs;
};

export const generateContent = async (topics: string[]): Promise<ContentPair[]> => {
  try {
    // This is a mock implementation since we're not actually connecting to OpenAI
    // In a real app, you would use your API key to make requests
    
    // For demo purposes, we'll return mock data
    const mockData: ContentPair[] = [
      {
        headline: "Reducing Scope 3 Emissions: Beyond Our Own Footprint",
        subheadline: "Syntech Biofuel's comprehensive approach to measuring and minimizing indirect carbon impact across our entire value chain."
      },
      {
        headline: "UK-Made Biofuel Driving the Circular Economy",
        subheadline: "Our locally produced solutions are creating sustainable jobs while keeping resources in continuous use."
      },
      {
        headline: "Carbon Reduction That Delivers Real Results",
        subheadline: "Quantifiable emissions reduction for construction projects through Syntech ASB technology."
      },
      {
        headline: "Building Tomorrow: Sustainable Construction Starts Today",
        subheadline: "How Syntech's advanced biofuels are transforming building sites across Britain."
      },
      {
        headline: "Net Zero Journey: Partnering for Meaningful Change",
        subheadline: "Syntech's collaborative approach to helping businesses achieve their climate commitments."
      },
      {
        headline: "Our Biofuel Actually Smells Quite Nice (But That's Not Why It Works)",
        subheadline: "Serious carbon reduction with the unexpected perk of a pleasant aroma. Your construction site might never smell the same again.",
        isFunny: true
      }
    ];
    
    return mockData;
    
    // In production, you would use code like this:
    /*
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}` // API key would be from environment variables
      },
      body: JSON.stringify({
        model: 'gpt-4-o',
        messages: [
          {
            role: 'user',
            content: generatePrompt(topics)
          }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    return parseAIResponse(content);
    */
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content');
  }
};
