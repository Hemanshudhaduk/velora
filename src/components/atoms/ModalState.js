"use client";
import { useState } from "react";

export default function ModalState() {
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const [openCancelServiceDrawerModal, setOpenCancelServiceDrawerModal] = useState(false);
  const openCancelServiceModal = () => setOpenCancelServiceDrawerModal(true);
  const closeCancelServiceModal = () => setOpenCancelServiceDrawerModal(true);

  const [openCancelEventDrawerModal, setOpenCancelEventDrawerModal] = useState(false);
  const openCancelEventModal = () => setOpenCancelEventDrawerModal(true);
  const closeCancelEventModal = () => setOpenCancelEventDrawerModal(true);

  const [openArchivedMessageModal, setOpenArchivedMessageModal] = useState(false);
  const openArchivedModal = () => setOpenArchivedMessageModal(true);
  const closeArchivedModal = () => setOpenArchivedMessageModal(false);

  const [openExceptionMessageModal, setExceptionMessageModal] = useState(false);
  const openExceptionModal = () => setExceptionMessageModal(true);
  const closeExceptionModal = () => setExceptionMessageModal(false);

  const [openTemplateMessageModal, setopenTemplateMessageModal] = useState(false);
  const openTemplateModal = () => setopenTemplateMessageModal(true);
  const closeTemplateModal = () => setopenTemplateMessageModal(false);

  const [openCancelBookingMessageModal, setCancelBookingMessageModal] = useState(false);
  const openCancelBookingModal = () => setCancelBookingMessageModal(true);
  const closeCancelBookingModal = () => setCancelBookingMessageModal(false);

  const [openCancelUpcomingActivityMessageModal, setCancelUpcomingActivityMessageModal] = useState(false);

  const [openProviderCompanyDetailsMessageModal, setOpenProviderCompanyDetailsMessageModal] = useState(false);
  const openCancelProviderCompanyDetailsModal = () => setOpenProviderCompanyDetailsMessageModal(true);
  const closeCancelProviderCompanyDetailsModal = () => setOpenProviderCompanyDetailsMessageModal(false);

  const openCancelUpcomingActivityModal = () => setCancelUpcomingActivityMessageModal(true);
  const closeCancelUpcomingActivityModal = () => setCancelUpcomingActivityMessageModal(false);

  const [imageCropModal, setImageCropModal] = useState();
  const openImageCropModal = () => setImageCropModal(true);
  const closeImageCropModal = () => setImageCropModal(false);

  return [
    modal,
    openModal,
    closeModal,
    openArchivedMessageModal,
    openArchivedModal,
    closeArchivedModal,
    openExceptionMessageModal,
    openExceptionModal,
    closeExceptionModal,
    openTemplateMessageModal,
    openTemplateModal,
    closeTemplateModal,
    openCancelBookingMessageModal,
    openCancelBookingModal,
    closeCancelBookingModal,
    openCancelUpcomingActivityMessageModal,
    openCancelUpcomingActivityModal,
    closeCancelUpcomingActivityModal,
    openProviderCompanyDetailsMessageModal,
    openCancelProviderCompanyDetailsModal,
    closeCancelProviderCompanyDetailsModal,
    openCancelServiceDrawerModal,
    openCancelServiceModal,
    closeCancelServiceModal,
    openCancelEventDrawerModal,
    openCancelEventModal,
    closeCancelEventModal,
    imageCropModal,
    openImageCropModal,
    closeImageCropModal,
  ];
}
