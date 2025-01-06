import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from "zod";
import { usernameValidation } from "@/Schemas/signUpSchema";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username"),
    };
    //validate with zod
    const result = UsernameQuerySchema.safeParse(queryParams);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "Invalid name",
        },
        {
          status: 400,
        }
      );
    }

    const { username } = result.data;

    const existingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUser) {
      return Response.json(
        {
          success: true,
          message: "Username already taken",
        },
        {
          status: 200,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Username is available",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error checking if username is unique", error);
    return Response.json(
      {
        success: false,
        message: "Error checking if username is unique",
      },
      {
        status: 500,
      }
    );
  }
}
