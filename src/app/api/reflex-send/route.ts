import { sendReflexVerseEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    // Allow CORS (cross-origin requests)
    const origin = request.headers.get('Origin');
    const allowedOrigins = ['*']; // Allow all origins - replace '*' with specific domains if needed

    // Ensure the origin is a valid string for the header
    const corsHeaders = {
        "Access-Control-Allow-Origin": origin ? origin : "*", // Use '*' if origin is null
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Allowed HTTP methods
        "Access-Control-Allow-Headers": "Content-Type", // Allowed request headers
    };

    // Handle preflight OPTIONS request
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 200,
            headers: corsHeaders,
        });
    }

    // Continue with your POST request logic
    const { email, name, budget, customBudget, videoType, videoLength, socialAccounts } = await request.json();

    if (!email || !name || !budget || !videoType) {
        return Response.json(
            { message: 'Missing required fields', success: false },
            { status: 400, headers: corsHeaders }
        );
    }

    try {
        const emailResponse = await sendReflexVerseEmail(email, name, budget, customBudget, videoType, videoLength, socialAccounts);

        if (!emailResponse.success) {
            return Response.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                {
                    status: 500,
                    headers: corsHeaders,
                }
            );
        }

        return Response.json({ message: 'Success - ReflexVerse email sent', success: true }, { status: 200, headers: corsHeaders });
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return Response.json(
            { message: 'Internal server error', success: false },
            { status: 500, headers: corsHeaders }
        );
    }
}
