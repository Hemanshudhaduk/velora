import { Skeleton, Table, TableBody, TableCell, TableRow } from "@mui/material";

const OverviewTabSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" component="h6" sx={{ marginBottom: 3, fontSize: "1.5rem" }} />
      <Table border="none" sx={{ marginBottom: 6 }}>
        <TableBody>
          <TableRow style={{ marginBottom: "4px" }}>
            <TableCell width="12.5%">
              <Skeleton variant="text" width="50%" height="24px" style={{ marginBottom: "4px" }} />
              <Skeleton variant="text" width="75%" height="24px" style={{ marginBottom: "4px" }} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" width="50%" height="24px" style={{ marginBottom: "4px" }} />
              <Skeleton variant="text" width="75%" height="24px" style={{ marginBottom: "4px" }} />
            </TableCell>
            <TableCell width="12.5%" align="center">
              <Skeleton
                variant="rectangular"
                width="100px"
                height="48px"
                style={{ margin: "auto", marginBottom: "4px" }}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
export default OverviewTabSkeleton;
