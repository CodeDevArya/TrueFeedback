import { sendReflexVerseEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request, res: any) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  const { email, name, budget, customBudget, videoType, videoLength, socialAccounts } = await request.json();

  if (request.method === 'OPTIONS') {
    // Respond to preflight request
    res.status(200).end();
    return;
  }


  if (!email || !name || !budget || !videoType) {
    return new Response(
      JSON.stringify({ message: "Missing required fields", success: false }),
      {
        status: 400
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
        }
      );
    }

    return new Response(
      JSON.stringify({ message: "Success - ReflexVerse email sent", success: true }),
      { status: 200 }
    );
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return new Response(
      JSON.stringify({ message: "Internal server error", success: false }),
      { status: 500 }
    );
  }
}
