"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { ExternalLink, Loader2, MessageCircle, Users, Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function LandingPage() {
  const { data: session, status } = useSession();

  const [mounted, setMounted] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <main className="container mx-auto px-4 py-12 space-y-24">
        <section className="text-center space-y-6">
          <h2 className="text-5xl font-extrabold leading-tight tracking-tighter md:text-6xl lg:text-7xl">
            Connect, Ask, Learn
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock knowledge and insights from experts, creators, and friends.
            Ask questions anonymously and get the answers you need.
          </p>
          <br />
          <a href={session ? "/dashboard" : "/sign-in"}>
            <Button size="lg">
              {status === "loading" ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : session ? (
                "Dashboard"
              ) : (
                "Get Started"
              )}
            </Button>
          </a>
        </section>

        <Carousel className="w-full max-w-md mx-auto">
          <CarouselContent>
            {[
              {
                title: "Ask Anonymously",
                description:
                  "Feel free to ask anything without revealing your identity",
              },
              {
                title: "Expert Answers",
                description:
                  "Get insights from professionals and thought leaders",
              },
              {
                title: "Connect with Creators",
                description:
                  "Engage directly with your favorite content creators",
              },
            ].map((item, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{item.description}</p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <section className="text-center space-y-8">
          <h3 className="text-3xl font-bold text-[#0F172A]">
            Visit a Creator's Page
          </h3>
          <Card className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-none shadow-lg max-w-md mx-auto">
            <CardContent>
              <form
                onSubmit={handleUrlSubmit}
                className="flex flex-col space-y-4 p-4"
              >
                <Input
                  type="url"
                  placeholder="Enter creator's URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="bg-white dark:bg-gray-700"
                  required
                />
                <Button type="submit">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Page
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <MessageCircle className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Anonymous Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Ask anything without fear. Your identity remains hidden,
                allowing for open and honest conversations.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Diverse Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Connect with a wide range of experts, creators, and like-minded
                individuals from various fields.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Zap className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Instant Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get quick responses to your burning questions. Our platform
                prioritizes speed and quality.
              </CardDescription>
            </CardContent>
          </Card>
        </section>

        <section className="text-center space-y-6">
          <h3 className="text-3xl font-bold">How It Works</h3>
          <ol className="grid gap-4 md:grid-cols-4 text-left">
            <li className="bg-card rounded-lg p-4 shadow-md">
              <span className="text-4xl font-bold text-primary">1</span>
              <p className="mt-2">Create an account or log in</p>
            </li>
            <li className="bg-card rounded-lg p-4 shadow-md">
              <span className="text-4xl font-bold text-primary">2</span>
              <p className="mt-2">Find friends or creators you want to ask</p>
            </li>
            <li className="bg-card rounded-lg p-4 shadow-md">
              <span className="text-4xl font-bold text-primary">3</span>
              <p className="mt-2">Submit your questions anonymously</p>
            </li>
            <li className="bg-card rounded-lg p-4 shadow-md">
              <span className="text-4xl font-bold text-primary">4</span>
              <p className="mt-2">Receive insightful answers</p>
            </li>
          </ol>
        </section>

        {status === "loading" ? (
          <></>
        ) : session ? (
          <></>
        ) : (
          <section className="text-center space-y-6">
            <h3 className="text-3xl font-bold">Ready to Get Started?</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our community today and start exploring a world of knowledge
              and connections.
            </p>
            <Button size="lg" className="text-lg px-8">
              <a href="/sign-up">Sign Up Now</a>
            </Button>
          </section>
        )}
      </main>

      <footer className="bg-muted mt-24">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">
            &copy; 2024 QuestionApp. All rights reserved.
          </p>
          <nav className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary">
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
