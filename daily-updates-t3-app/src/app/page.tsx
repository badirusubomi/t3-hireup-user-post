// import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { auth } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();
  const hello = await api.post.hello({ text: "from tRPC" });
  const updatePost = await api.post.update({ text: "From Subomi" });

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
            {updatePost ? updatePost.message : "Nothing returned"}
          </p>
          {/* <LatestPost /> */}
          {session?.user && <LatestPost />}
        </div>
      </main>
    </HydrateClient>
  );
}
