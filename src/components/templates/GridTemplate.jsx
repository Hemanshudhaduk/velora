import { GridHeader, GridLayout } from "../organisms";

const GridTemplate = params => (
  <>
    <GridHeader
      header={params.header}
      subHeader={params.subHeader}
      filterConfiguration={params.filterConfiguration}
      configurations={params.configurations}
    />
    <GridLayout
      dataList={params.dataList}
      pageNumber={params.pageNumber}
      cardType={params.cardType}
      pageSize={params.pageSize}
      totalCount={params.totalCount}
      pageSizeOptions={params.pageSizeOptions}
      noRecordMessage={params.noRecordMessage}
      onPageChange={params.onPageChange}
      onRowsPerPageChange={params.onRowsPerPageChange}
      labelRowsPerPage={params.labelRowsPerPage}
      of={params.of}
    />
  </>
);
export default GridTemplate;
