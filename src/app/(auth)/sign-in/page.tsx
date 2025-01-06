"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { signInSchema } from "@/Schemas/signInSchema";
import { signIn, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    const response = await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: false,
    });
    if (response?.error) {
      if (response?.error === "Configuration") {
        toast({
          title: "Sign In Failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      } else {
        toast({
          title: "Error",
          description: "Error Signing In " + response?.error,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

    if (response?.url) {
      toast({
        title: "Sign In Successfully",
      });

      router.replace("/dashboard");
    }
  };

  const dataTwo = useSession();
  if (dataTwo.data) {
    router.replace("/dashboard");
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
              Join True Feedback
            </h1>
            <p className="mb-4">Sign in to start your anonymous adventure</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="identifier"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email/Username</FormLabel>
                    <Input {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" {...field} name="password" />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing
                    In...
                  </>
                ) : (
                  <>Sign In</>
                )}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <p>
              Already a member?{" "}
              <Link
                href="/sign-up"
                className="text-blue-600 hover:text-blue-800"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
