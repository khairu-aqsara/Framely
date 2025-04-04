import { SidebarTrigger } from "@/components/ui/sidebar";
import NewPageModal from "./new-page-modal";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import PageItem from "./page-item";
async function PageList() {
  const { userId } = await auth();
  const pages = await db.page.findMany({
    where: { userId: userId || "" },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="w-full p-6">
      <SidebarTrigger className="w-12 h-12 mb-4" />
      <div className="container flex flex-col items-center mx-auto">
        <div className="flex flex-col w-full max-w-4xl space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Pages</h1>
            <NewPageModal />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {pages.length >= 1 ? (
              pages.map((page) => <PageItem key={page.id} page={page} />)
            ) : (
              <p className="mt-4 text-center text-muted-foreground">
                It&apos;s pretty empty in here, create a page to get started.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageList;
