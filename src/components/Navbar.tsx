"use client";

import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const Navbar = () => {
  const { data: session, status } = useSession();

  const user: User = session?.user as User;

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex-shrink-0">
            <span className="text-2xl font-bold text-primary">
              True Feedback
            </span>
          </a>
          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : !user ? (
              <>
                <a href="/sign-in">
                  <Button variant="ghost">Login</Button>
                </a>
                <a href="/sign-up">
                  <Button>Sign Up</Button>
                </a>
              </>
            ) : (
              <>
                <span className="text-sm font-medium hidden sm:inline">
                  Hello, {user.username}
                </span>
                <Button onClick={() => signOut()}>Logout</Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
