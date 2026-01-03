"use client";

import { Select } from "@radix-ui/themes";
import { Status } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  issueId: number;
  currentStatus: Status;
}

const statusMap: Record<Status, { label: string; color: "red" | "violet" | "green" }> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusSelect = ({ issueId, currentStatus }: Props) => {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStatusChange = async (newStatus: Status) => {
    try {
      setIsUpdating(true);
      await axios.patch(`/api/issues/${issueId}`, {
        status: newStatus,
      });
      router.refresh();
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Select.Root
      value={currentStatus}
      onValueChange={(value) => handleStatusChange(value as Status)}
      disabled={isUpdating}
    >
      <Select.Trigger 
        variant="soft" 
        color={statusMap[currentStatus].color}
      >
        {statusMap[currentStatus].label}
      </Select.Trigger>
      <Select.Content>
        {Object.entries(statusMap).map(([status, { label }]) => (
          <Select.Item key={status} value={status}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusSelect;

