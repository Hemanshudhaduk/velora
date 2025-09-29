"use client";
import { Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

const BillingDetailSkeleton = () => {
  return (
    <>
      <Table border="none" padding="large">
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" width="50%" height="24px" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width="50%" height="24px" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width="50%" height="24px" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width="50%" height="24px" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" width="50%" height="24px" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width="50%" height="24px" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width="50%" height="24px" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width="50%" height="24px" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" width="50%" height="24px" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width="50%" height="24px" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width="50%" height="24px" />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width="50%" height="24px" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default BillingDetailSkeleton;
