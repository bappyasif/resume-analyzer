import Link from "next/link";
import { HydrateClient } from "~/trpc/server";
import { MainSection } from "./_components/MainSection";
import HowItWorksSection from "./_components/HowItWorks";
import { FeatureCards } from "./_components/FeatureCards";
import { Button } from "~/components/ui/button";

export default async function Home() {
  return (
    <HydrateClient>
      <main
        className="flex min-h-screen flex-col items-center justify-center p-4 gap-3.5 pb-8"
      >
        <MainSection />
        <section className="py-16 px-4 bg-transparent w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Features</h2>
            <p className="text-lg text-muted-foreground">Why choose us?</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <FeatureCards />
          </div>
        </section>
        <HowItWorksSection />

        <Button variant={"default"} size={"lg"} className="p-8 text-lg font-semibold rounded-lg inline-flex items-center gap-2 cursor-pointer">
          <Link
            href="/resume/upload"
            className="flex justify-center px-8 py-4 font-bold text-xl shadow-lg transition duration-300 mt-6 w-1/4 text-center items-center my-4 rounded-2xl"
          >
            Upload Resume
          </Link>
        </Button>
      </main>
    </HydrateClient>
  );
}
