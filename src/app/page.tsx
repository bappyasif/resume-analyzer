import Link from "next/link";

// import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { MainSection } from "./_components/MainSection";
import StatisticsSection from "./_components/Statistics";
import HowItWorksSection from "./_components/HowItWorks";
import FAQSection from "./_components/Faq";
import { FeatureCards } from "./_components/FeatureCards";
import { Button } from "~/components/ui/button";
// import { Navigations } from "./_components/Navigations";
// import { PdfUploader } from "./_components/pdfUploader";

export default async function Home() {
  const session = await auth();

  // if (session?.user) {
  //   void api.post.getLatest.prefetch();
  // }

  return (
    <HydrateClient>
      {/* <Navigations /> */}
      <main
        // className="flex min-h-screen flex-col items-center justify-center bg-[#2E026D] p-4 gap-3.5"
        className="flex min-h-screen flex-col items-center justify-center p-4 gap-3.5 pb-8"
      >
        {/* {session?.user && <LatestPost />} */}
        <MainSection />
        {/* <StatisticsSection /> */}
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
        {/* <FAQSection /> */}

        {/* <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div> */}

        {/* <PdfUploader /> */}

        {/* <Link href="/pdf-parse">pdf parse</Link> */}
        {/* <Link href="/resume/upload" className="flex justify-center px-8 py-4 bg-blue-600 text-white font-bold text-xl shadow-lg hover:bg-blue-700 transition duration-300 mt-6 w-1/4 text-center items-center my-4 rounded-2xl">
          Upload Resume
        </Link> */}

        <Button variant={"default"} size={"lg"} className="p-8 text-lg font-semibold rounded-lg inline-flex items-center gap-2 cursor-pointer">
          <Link
            href="/resume/upload"
            className="flex justify-center px-8 py-4 font-bold text-xl shadow-lg transition duration-300 mt-6 w-1/4 text-center items-center my-4 rounded-2xl"
          // className="flex justify-center px-8 py-4 bg-blue-600 text-white font-bold text-xl shadow-lg hover:bg-blue-700 transition duration-300 mt-6 w-1/4 text-center items-center my-4 rounded-2xl"
          >
            Upload Resume
          </Link>
        </Button>
      </main>
    </HydrateClient>
  );
}
