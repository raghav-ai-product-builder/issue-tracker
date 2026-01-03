import prisma from "@/lib/prisma";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueTable from "../components/IssueTable";
import IssueStatusFilter from "./IssueStatusFilter";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <Flex justify="between" mb="5">
        <IssueStatusFilter />
        <Button asChild>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </Flex>
      <IssueTable issues={issues} />
    </div>
  );
};

export default IssuesPage;
