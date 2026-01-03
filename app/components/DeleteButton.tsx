"use client";

import { Button } from "@radix-ui/themes";
import { deleteIssue } from "@/app/actions/deleteIssue";
import { useRouter } from "next/navigation";

interface Props {
  issueId: number;
}

export default function DeleteButton({ issueId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this issue?")) {
      await deleteIssue(issueId);
      router.refresh();
    }
  };

  return (
    <Button color="red" variant="soft" onClick={handleDelete}>
      Delete
    </Button>
  );
}
