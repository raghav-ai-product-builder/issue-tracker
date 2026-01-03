import prisma from "@/lib/prisma";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueTable from "../components/IssueTable";

async function getIssues() {
  const issues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return issues;
}

const IssuesPage = async () => {
  const issues = await getIssues();

  return (
    <div>
      <Flex justify="between" mb="5">
        <h1 className="text-2xl font-bold">All Issues</h1>
        <Button asChild>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
      <IssueTable issues={issues} />
    </div>
  );
};

export default IssuesPage;
