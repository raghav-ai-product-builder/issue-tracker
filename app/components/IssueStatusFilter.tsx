"use client";

import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Select } from "@radix-ui/themes";

const statuses: { label: string; value: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status") || "ALL";

  return (
    <Select.Root
      value={currentStatus}
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status && status !== "ALL") {
          params.append("status", status);
        }
        const query = params.size ? `?${params.toString()}` : "";
        router.push(`/${query}`);
        router.refresh();
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.value} value={status.value}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;

