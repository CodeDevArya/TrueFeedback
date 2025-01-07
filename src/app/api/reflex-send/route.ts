import { sendReflexVerseEmail } from "@/helpers/sendVerificationEmail";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Allow all origins, or specify your origin
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS", // Specify allowed HTTP methods
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // Specify allowed headers
};

export async function POST(request: Request) {
  const { email, name, budget, customBudget, videoType, videoLength, socialAccounts } = await request.json();

  if (!email || !name || !budget || !videoType) {
    return new Response(
      JSON.stringify({ message: "Missing required fields", success: false }),
      {
        status: 400,
        headers: corsHeaders,
      }
    );
  }

  try {
    const emailResponse = await sendReflexVerseEmail(
      email,
      name,
      budget,
      customBudget,
      videoType,
      videoLength,
      socialAccounts
    );

    if (!emailResponse.success) {
      return new Response(
        JSON.stringify({
          success: false,
          message: emailResponse.message,
        }),
        {
          status: 500,
          headers: corsHeaders,
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Success - ReflexVerse email sent", success: true }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", success: false }),
      { status: 500, headers: corsHeaders }
    );
  }
}
