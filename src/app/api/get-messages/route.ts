import dbConnect from '@/lib/dbConnect';
import mongoose from 'mongoose';
import { User } from 'next-auth';
import UserModel from '@/models/User';
import { auth } from '@/auth';

export async function GET() {
  await dbConnect();
  const session = await auth();
  const _user: User = session?.user as User;

  if (!session || !_user) {
    return Response.json(
      { success: false, message: 'Not authenticated' },
      { status: 401 }
    );
  }
  const userId = new mongoose.Types.ObjectId(_user._id);
  try {
    const user = await UserModel.aggregate([
      { $match: { _id: userId } },
      { 
        $unwind: { 
          path: "$messages", 
          preserveNullAndEmptyArrays: true // Include users even if `messages` array is empty
        } 
      },
      { $sort: { 'messages.createdAt': -1 } }, // Sort by `createdAt`, descending
      { 
        $group: { 
          _id: '$_id', 
          messages: { $push: '$messages' } // Reconstruct the messages array
        } 
      }
    ]).exec();
    
    if (!user || user.length === 0) {
      return Response.json(
        { message: 'User not found', success: false },
        { status: 404 }
      );
    }

    return Response.json(
      { messages: user[0].messages },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return Response.json(
      { message: 'Internal server error', success: false },
      { status: 500 }
    );
  }
}
