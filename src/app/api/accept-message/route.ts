import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import getServerSession, { User } from "next-auth";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const session: any = await auth();
    const user: User = session?.user;

    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "User Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const userId = user._id;
    const { acceptMessages } = await request.json();

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          isAcceptingMessages: acceptMessages,
        },
        { new: true }
      );

      if (!updatedUser) {
        return Response.json(
          {
            success: false,
            message: "User not found",
          },
          {
            status: 401,
          }
        );
      } else {
        return Response.json(
          {
            success: true,
            message: "User status updated successfully",
            updatedUser,
          },
          {
            status: 200,
          }
        );
      }
    } catch (error) {
      console.log("Failed to update user status to accept messages:", error);
      return Response.json(
        {
          success: false,
          message: "Failed to update user status to accept messages",
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error("Error toggling isMessageAccepting:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to toggle isMessageAccepting",
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  await dbConnect();
  try {
    const session: any = await auth();
    const user: User = session?.user;


    if (!session || !session.user) {
      return Response.json(
        {
          success: false,
          message: "User Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const userId = user._id;

    const foundUser = await UserModel.findById(userId);

    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    } else {
      return Response.json(
        {
          success: true,
          isAcceptingMessages: foundUser.isAcceptingMessages,
        },
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    console.error("Error getting isMessageAccepting status:", error);
    return Response.json(
      {
        success: false,
        message: "Failed to get isMessageAccepting status",
      },
      {
        status: 500,
      }
    );
  }
}
