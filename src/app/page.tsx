import Link from "next/link";

// import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";
import { MainSection } from "./_components/MainSection";
import StatisticsSection from "./_components/Statistics";
import HowItWorksSection from "./_components/HowItWorks";
import FAQSection from "./_components/Faq";
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
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#2E026D] p-4 gap-3.5">
        {/* {session?.user && <LatestPost />} */}
        <MainSection />
        <StatisticsSection />
        <HowItWorksSection />
        <FAQSection />

        <div className="flex flex-col items-center gap-2">
          {/* <p className="text-2xl text-white">
              {hello ? hello.greeting : "Loading tRPC query..."}
            </p> */}

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
        </div>

        {/* <PdfUploader /> */}

        {/* <Link href="/pdf-parse">pdf parse</Link> */}
        <Link href="/resume/upload" className="text-white underline">
          Upload Resume
        </Link>
      </main>
    </HydrateClient>
  );
}
