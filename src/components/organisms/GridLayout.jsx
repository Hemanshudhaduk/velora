import { Grid } from "@mui/material";
import { GridItemCard, ListItemCard, ListItemUserCard } from "../molecules";
import { TablePaginationStyle } from "../style";

const GridLayout = props => {
  const {
    dataList,
    pageNumber,
    cardType,
    pageSize,
    totalCount,
    onPageChange,
    noRecordMessage,
    onRowsPerPageChange,
    pageSizeOptions,
    labelRowsPerPage,
    of,
    page,
  } = props;

  if (pageNumber < Math.ceil(totalCount / pageSize)) {
    return (
      <>
        {dataList !== undefined && dataList !== null && cardType === "horizontal" && (
          <Grid container spacing={2}>
            {dataList !== undefined &&
              dataList !== null &&
              cardType === "horizontal" &&
              dataList.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <ListItemCard
                    title={item.title}
                    imageUrl={item.imageUrl}
                    noImageText={item.noImageText}
                    calenderText={item.calenderText}
                    locationText={item.locationText}
                    priceText={item.priceText}
                    bottomRight={item.bottomRight}
                  />
                </Grid>
              ))}
          </Grid>
        )}

        {dataList !== undefined && dataList !== null && cardType === "horizontal3" && (
          <Grid container spacing={2}>
            {dataList !== undefined &&
              dataList !== null &&
              cardType === "horizontal3" &&
              dataList.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                  <ListItemUserCard
                    href={item.href}
                    imageUrl={item.imageUrl}
                    tag={item.tag}
                    title={item.title}
                    description={item.description}
                    noImageText={item.noImageText}
                    bottomImageUrl={item.bottomImageUrl}
                    bottomImageTitle={item.bottomImageTitle}
                    bottomImageDescription={item.bottomImageDescription}
                  ></ListItemUserCard>
                </Grid>
              ))}
          </Grid>
        )}

        {dataList !== undefined && dataList !== null && cardType === "vertical" && (
          <Grid container spacing={2}>
            {dataList !== undefined &&
              dataList !== null &&
              cardType === "vertical" &&
              dataList.map((item, index) => (
                <GridItemCard
                  key={index}
                  title={item.title}
                  imageUrl={item.imageUrl}
                  noImageText={item.noImageText}
                  locationText={item.locationText}
                  bottomRight={item.bottomRight}
                  page={page}
                />
              ))}
          </Grid>
        )}
        <TablePaginationStyle
          component="div"
          page={pageNumber ?? 0}
          rowsPerPage={pageSize ?? 50}
          count={totalCount}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          labelRowsPerPage={labelRowsPerPage}
          rowsPerPageOptions={
            pageSizeOptions !== null && pageSizeOptions !== undefined && pageSizeOptions.length > 0
              ? pageSizeOptions
              : [10, 25, 50]
          }
          labelDisplayedRows={(from = page) =>
            `${from.from}-${from.to === -1 ? from.count : from.to} ${of} ${from.count}`
          }
        />
      </>
    );
  } else return <div>{noRecordMessage}</div>;
};

export default GridLayout;
