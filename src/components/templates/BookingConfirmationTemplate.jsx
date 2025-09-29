"use client";

import { confirmPaymentBooking } from "@/src/api/activity";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Confirmation } from "../molecules";
import { ContainerStyle } from "../style";

function BookingConfirmationTemplate({ guid }) {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  const summaryPageData = JSON.parse(localStorage.getItem("summaryPageData"));
  const [confirmationData, setConfirmationData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const confirmBooking = async () => {
    const response = await confirmPaymentBooking(session_id);
    if (response) setConfirmationData(response);
    setIsLoading(false);
  };

  useEffect(() => {
    if (session_id) confirmBooking();
    else if (summaryPageData?.paymentStatus) {
      setConfirmationData(summaryPageData);
      setIsLoading(false);
    }
  }, [session_id]);

  return (
    <ContainerStyle>
      <Confirmation confirmationData={confirmationData} guid={guid} isLoading={isLoading} />
    </ContainerStyle>
  );
}

export default BookingConfirmationTemplate;
