"use client"

import { CloseOutlined } from "@mui/icons-material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { StyledDialog } from "../style";

export default function CommonModal({
  open,
  title,
  details,
  closeModal,
  popUpButtons,
  className,
  closeIcon,
  maxWidth,
}) {
  const handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    closeModal();
  };

  return (
    <div>
      <StyledDialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        className={className}
        maxWidth={maxWidth}
      >
        <DialogTitle className="cm-modal-header">
          <span>{title}</span>
          {closeIcon && <CloseOutlined onClick={closeModal} style={{ cursor: "pointer" }} />}
        </DialogTitle>
        <DialogContent>{details}</DialogContent>
        <DialogActions>{popUpButtons}</DialogActions>
      </StyledDialog>
    </div>
  );
}
