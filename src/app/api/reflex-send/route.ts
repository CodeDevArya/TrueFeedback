import { sendReflexVerseEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {

    const { email, name, budget, customBudget, videoType, videoLength, socialAccounts } = await request.json();

    if (!email || !name || !budget || !videoType) {
        return Response.json(
            { message: 'Missing required fields', success: false },
            { status: 400 }
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
                }
            );
        }

        return Response.json({ message: 'Success - ReflexVerse email sent', success: true }, { status: 200 });
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return Response.json(
            { message: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}
