"use client";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { verifySchema } from "@/Schemas/verifySchema";
import { ApiResponse } from "@/types/apiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const VerifyAccount = () => {
  const router = useRouter();
  const { username } = useParams<{ username: string }>();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/verify-code", {
        username,
        verifyCode: data.code,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });

      setIsLoading(false);
      router.push("/sign-in");
    } catch (error) {
      console.error("Error verifying account:", error);

      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Sign Up Failed",
        description: axiosError.response?.data.message,
        variant: "destructive",
      });

      setIsLoading(false);
    }
  };

  const dataTwo = useSession();
  if (dataTwo.data) {
    router.push("/dashboard");
  }

  if (dataTwo.status === "loading" || dataTwo.data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      </div>
    );
  } else {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md m-4">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
              Verify Account
            </h1>
            <p className="mb-4">
              Enter the verification code sent to your email
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <Input placeholder="Code" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>Verify Account</>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    );
  }
};

export default VerifyAccount;
