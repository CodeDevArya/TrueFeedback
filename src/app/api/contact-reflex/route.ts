import { send__CONTACT_ReflexVerseEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {

    const { email, name, body } = await request.json();


    if (!email || !name || !body) {
        return Response.json(
            { message: 'Missing required fields', success: false },
            { status: 400 }
        );
    }

    try {

        const emailResponse = await send__CONTACT_ReflexVerseEmail(email, name, body);

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

        return Response.json({ message: 'Success - ReflexVerse  - Contact -  email sent', success: true }, { status: 200 });
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return Response.json(
            { message: 'Internal server error', success: false },
            { status: 500 }
        );
    }
}
