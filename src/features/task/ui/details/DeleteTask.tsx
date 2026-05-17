"use client";

import ConfirmModal from "@/shared/ui/ConfirmModal";
import { Button } from "@/shared/ui/button";
import { useState } from "react";

interface Props {
  onConfirm: () => Promise<void>;
}

const DeleteTask = ({ onConfirm }: Props) => {
  const [confirmModal, setConfirmModal] = useState<boolean>(false);

  return (
    <>
      <ConfirmModal
        confirmButtonText={"Continue"}
        description={"Are you sure with task deletion?"}
        isOpen={confirmModal}
        title={"Delete"}
        onClose={() => setConfirmModal(false)}
        onConfirm={onConfirm}
      />

      <div className={"flex justify-end w-full!"}>
        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={() => setConfirmModal(true)}
        >
          Delete task
        </Button>
      </div>
    </>
  );
};

export default DeleteTask;
