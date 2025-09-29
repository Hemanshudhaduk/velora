"use client";
import { getCustomerBillingDetails, getPaymentInvoiceURL } from "@/src/api/Billing";
import FuseSplashScreen from "@/src/app/[locale]/auth/fuseSplashScreen";
import { CommonSnackBar, SnackState } from "@/src/components/atoms";
import { selectUser, selectUserDetail } from "@/src/lib/slice/userSlice";
import { ConvertUTCToUserTimeZone, redirectToSignIn } from "@/src/utils";
import "@/src/utils/momentLocale";
import { Button, Grid, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import moment from "moment";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BillingDetailSkeleton } from "../skeletons";
import { TablePaginationStyle } from "../style";

function BillingTemplate({ locale }) {
  const t = useTranslations();
  const route = useRouter();
  const pathname = usePathname();
  const getUser = useSelector(selectUser);
  const [snack, closeSnack, showSnackbar] = SnackState();
  const getUserDetails = useSelector(selectUserDetail);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [templatePage, setTemplatePage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [billingDetails, setBillingDetails] = useState();
  const [billingDetailsCount, setBillingDetailsCount] = useState();

  const getUserPaymentDetails = async request => {
    const response = await getCustomerBillingDetails(request);
    setBillingDetails(response?.data?.billingDetails);
    setBillingDetailsCount(response?.data?.totalCount[0]?.totalCount);
    setIsLoading(false);
  };

  if (!getUser?.data?.email) redirectToSignIn(route, pathname);

  const handleRowsPerPageChange = async event => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setTemplatePage(0);
    const request = {
      userRoleUnqGUID: getUserDetails?.userDetailUnqGuid,
      rowPerPage: newRowsPerPage,
      pageNumber: 1,
    };
    setIsLoading(true);
    await getUserPaymentDetails(request);
    window.scroll({ top: 0 });
  };

  const handlePageChange = async (event, newPage) => {
    setTemplatePage(newPage);
    const request = {
      userRoleUnqGUID: getUserDetails?.userDetailUnqGuid,
      rowPerPage: rowsPerPage,
      pageNumber: newPage + 1,
    };
    setIsLoading(true);
    await getUserPaymentDetails(request);
    window.scroll({ top: 0 });
  };

  const getPaymentInvoiceDetails = async (invoiceID, stripeConnectedId) => {
    const response = await getPaymentInvoiceURL(invoiceID, stripeConnectedId);
    if (response?.status === "Success") {
      window.open(response?.data?.url, "_blank");
    } else {
      showSnackbar(t("commonFailedResponse"), "error");
    }
  };

  useEffect(() => {
    if (getUserDetails?.userDetailUnqGuid) {
      const request = {
        userRoleUnqGUID: getUserDetails?.userDetailUnqGuid,
        rowPerPage: rowsPerPage,
        pageNumber: 1,
      };
      getUserPaymentDetails(request);
    }
  }, [getUserDetails]);

  return (
    <>
      {getUser?.data?.email !== "" ? (
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <Typography variant="h5" fontWeight={600} mb={8}>
                {t("billing.billingLabel")}
              </Typography>
            </Grid>
          </Grid>
          {isLoading ? (
            <BillingDetailSkeleton />
          ) : (
            <Table padding="large">
              <TableHead>
                <TableRow>
                  <TableCell>{t("billing.eventOrServiceName")}</TableCell>
                  <TableCell>{t("billing.serviceProvider")}</TableCell>
                  <TableCell>{t("billing.dateTime")}</TableCell>
                  <TableCell>{t("billing.invoiceReceipt")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billingDetails?.map((billing, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell>{billing.activityName}</TableCell>
                      <TableCell>{billing.companyName}</TableCell>
                      <TableCell>
                        {moment(ConvertUTCToUserTimeZone(billing.created, billing.activityGoogleTimeZone))
                          .locale(t("languageCode"))
                          .format("DD MMM YYYY HH:mm")}
                      </TableCell>
                      <TableCell>
                        {billing.isOnlinePayment === false ? (
                          t("billing.contactProvider")
                        ) : (
                          <Button
                            onClick={() => getPaymentInvoiceDetails(billing.invoiceID, billing.stripeConnectedId)}
                            variant="text"
                          >
                            {t("billing.invoice")}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
          {isLoading ? (
            <Grid container>
              <Grid item xs={6} sm={6}>
                <></>
              </Grid>
              <Grid item xs={6} sm={6}>
                <Skeleton variant="text" />
              </Grid>
            </Grid>
          ) : (
            billingDetailsCount !== 0 &&
            billingDetails?.length > 0 && (
              <TablePaginationStyle
                component="div"
                count={billingDetailsCount}
                page={templatePage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[10, 25, 50]}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPageChange}
                labelRowsPerPage={t("activity.rowsPerPage")}
                labelDisplayedRows={(from = page) =>
                  `${from.from}-${from.to === -1 ? from.count : from.to} ${t("of")} ${from.count}`
                }
              />
            )
          )}
          <CommonSnackBar snackObj={snack} closeSnack={closeSnack} buttonProp />
        </>
      ) : (
        <FuseSplashScreen />
      )}
    </>
  );
}

export default BillingTemplate;
