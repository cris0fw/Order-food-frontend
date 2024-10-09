import React, { useState } from "react";
import { DeleteButtonProps } from "@/app/types/index";

const DeleteButton = (props: DeleteButtonProps) => {
  const { label, onDelete } = props;
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex justify-center items-center h-full">
        <div className="bg-white p-4 rounded-lg">
          <div>Are you sure you want to delete?</div>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
              className="primary"
            >
              Yes, &nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setShowConfirm(true)}>
      {label}
    </button>
  );
};

export default DeleteButton;
