import prisma from "@/lib/prisma";
import { Flex } from "@radix-ui/themes";
import IssueTable from "./components/IssueTable";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./components/IssueStatusFilter";

interface Props {
  searchParams: Promise<{ status?: string }>;
}

async function getIssues(status?: string) {
  const validStatuses = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const issues = await prisma.issue.findMany({
    where:
      status && validStatuses.includes(status)
        ? { status: status as "OPEN" | "IN_PROGRESS" | "CLOSED" }
        : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });
  return issues;
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;
  const status = params.status;

  const issues = await getIssues(status);

  return (
    <div>
      <Flex justify="between" mb="5">
        <Flex gap="4" align="center">
          <h1 className="text-2xl font-bold">Latest Issues</h1>
          <IssueStatusFilter />
        </Flex>
        <Button asChild>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
      <IssueTable issues={issues} showActions={false} />
    </div>
  );
}
