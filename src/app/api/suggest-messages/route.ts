import { openai } from "@ai-sdk/openai";
import { streamText, convertToCoreMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

type MessageType = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function POST() {
  const apiKey = process.env.OPENAI_API_KEY; // Make sure you have your API key set in your environment variables

  if (!apiKey) {
    return new Response("API key is missing", { status: 500 });
  }

  // Use a fixed prompt for generating questions
  const messages: MessageType[] = [
    {
      role: "user",
      content:
        "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.",
    },
  ];

  try {
    const result = await streamText({
      model: openai("gpt-4-turbo"),
      messages: convertToCoreMessages(messages),
      headers: {
        Authorization: `Bearer ${apiKey}`, // Pass the API key in the Authorization header
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
