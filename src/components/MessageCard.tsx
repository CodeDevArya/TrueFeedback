"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash} from "lucide-react";
import { Message } from "@/models/User";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import { useToast } from "@/hooks/use-toast";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  const { toast } = useToast();

  const HandleDeleteConfirm = async () => {
    try {
      const response = await axios.delete<ApiResponse>(
        `/api/delete-messages/${message._id}`
      );
      toast({
        title: response.data.message,
      });
      onMessageDelete(message._id as string);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ?? "Failed to delete message",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="relative p-3">
      <CardHeader>
        <CardTitle>{message?.content}</CardTitle>
        <CardDescription>
          Send on {message?.createdAt.toString().split("T")[0]}
        </CardDescription>
        {/* ------------------------------------ */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="absolute bottom-2 right-2">
              <Trash className="w-5 h-5" color="red" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                message and remove it&apos;s data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => HandleDeleteConfirm()}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* ------------------------------------ */}
      </CardHeader>
    </Card>
  );
};

export default MessageCard;
