import { EndPoint, TokenAPI } from "@/src/utils/common";

export async function getCustomerBillingDetails(request) {
  try {
    return await TokenAPI.post(EndPoint.billing.getCustomerBillingDetails, request);
  } catch (error) {
    console.error("Error during contacting to support:", error);
  }
}

export async function getPaymentInvoiceURL(invoiceID, stripeConnectedId) {
  try {
    return await TokenAPI.get(
      `${EndPoint.billing.getPaymentInvoiceURL}?invoiceID=${invoiceID}&stripeConnectedId=${stripeConnectedId}`
    );
  } catch (error) {
    console.error("Error during contacting to support:", error);
  }
}
