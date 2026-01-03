import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import EditButton from "@/app/components/EditButton";
import DeleteButton from "@/app/components/DeleteButton";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const { id } = await params;
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <div className="grid md:grid-cols-5 gap-5">
      <Box className="md:col-span-4">
        <Heading>{issue.title}</Heading>
        <Flex className="gap-3 my-2">
          <IssueStatusBadge status={issue.status} />
          <Text className="text-gray-500">
            {issue.createdAt.toLocaleDateString()}
          </Text>
        </Flex>
        <Card className="prose max-w-full mt-4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditButton issueId={issue.id} />
          <DeleteButton issueId={issue.id} />
        </Flex>
      </Box>
    </div>
  );
};

export default IssueDetailPage;

