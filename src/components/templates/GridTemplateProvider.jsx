import { GridLayout } from "../organisms";
import GridHeaderProvider from "../organisms/GridHeaderProvider";

const GridTemplateProvider = params => (
  <>
    <GridHeaderProvider
      header={params.header}
      subHeader={params.subHeader}
      filterConfiguration={params.filterConfiguration}
      configurations={params.configurations}
      page={params.page}
      setUrl={params.setUrl}
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
      page={params.page}
    />
  </>
);
export default GridTemplateProvider;
