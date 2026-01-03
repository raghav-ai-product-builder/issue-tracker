"use client";

import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";

interface Props {
  issueId: number;
}

const EditButton = ({ issueId }: Props) => {
  return (
    <Button asChild>
      <Link href={`/issues/${issueId}/edit`}>
        <Pencil2Icon />
        Edit Issue
      </Link>
    </Button>
  );
};

export default EditButton;

