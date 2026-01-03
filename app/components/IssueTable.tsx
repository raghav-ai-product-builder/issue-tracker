import { Table } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusBadge from "./IssueStatusBadge";
import IssueStatusSelect from "./IssueStatusSelect";
import { Issue } from "@prisma/client";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";

interface Props {
  issues: Issue[];
  showActions?: boolean;
}

const IssueTable = ({ issues, showActions = true }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Status
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Created
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell className="hidden md:table-cell">
            Updated
          </Table.ColumnHeaderCell>
          {showActions && <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link
                href={`/issues/${issue.id}`}
                className="hover:underline font-medium"
              >
                {issue.title}
              </Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {showActions ? (
                <IssueStatusSelect issueId={issue.id} currentStatus={issue.status} />
              ) : (
                <IssueStatusBadge status={issue.status} />
              )}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toLocaleDateString()}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.updatedAt.toLocaleDateString()}
            </Table.Cell>
            {showActions && (
              <Table.Cell>
                <div className="flex gap-2">
                  <EditButton issueId={issue.id} />
                  <DeleteButton issueId={issue.id} />
                </div>
              </Table.Cell>
            )}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default IssueTable;

