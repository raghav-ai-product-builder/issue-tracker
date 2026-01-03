import prisma from "@/lib/prisma";
import { Flex } from "@radix-ui/themes";
import IssueTable from "./components/IssueTable";
import { Button, Link as RadixLink } from "@radix-ui/themes";
import Link from "next/link";

async function getIssues() {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return issues;
}

export default async function Home() {
  const issues = await getIssues();

  return (
    <div>
      <Flex justify="between" mb="5">
        <h1 className="text-2xl font-bold">Latest Issues</h1>
        <Button asChild>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
      <IssueTable issues={issues} showActions={false} />
    </div>
  );
}
