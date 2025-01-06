import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/models/User";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content }: { username: string; content: string } =
    await request.json();
  if (!username || !content) {
    return Response.json(
      { success: false, message: "Please provide username and content" },
      { status: 400 }
    );
  }

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    //is user accepting messages
    if (!user.isAcceptingMessages) {
      return Response.json(
        { success: false, message: "User not accepting messages" },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      { success: true, message: "Message sent successfully" },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending message: ", error);
    return Response.json(
      { success: false, message: "Failed to send message" },
      { status: 500 }
    );
  }
}
