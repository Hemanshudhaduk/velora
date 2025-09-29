"use client";
import { fetchFilterList } from "@/src/api/activity";
import { fetchProviderList } from "@/src/api/provider";
import ProviderGridSkeleton from "@/src/components/skeletons/ProviderGridSkeleton";
import { ContainerStyle, ProviderSectionStyle } from "@/src/components/style";
import GridTemplateProvider from "@/src/components/templates/GridTemplateProvider";
import { generateConfigurationProvider, generateURLFromPayloadProvider } from "@/src/utils/common/functions";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = page => {
  const [isSkeleton, setIsSkeleton] = useState(true);
  const t = useTranslations();
  const router = useRouter();
  const [grid, setGrid] = useState({ list: [], totalCount: 0 });
  const [filterList, setFilterList] = useState(null);

  const payload = generateConfigurationProvider(page);

  const getProviderList = async payload => {
    setIsSkeleton(true);
    await fetchProviderList({ ...payload }, setGrid, t, router);
    setIsSkeleton(false);
  };

  const getFiltersList = async languageCode => {
    const response = await fetchFilterList(languageCode, "provider");
    if (response?.status === "Success") {
      setFilterList(response.data);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && typeof page === "object" && page !== undefined) {
      getFiltersList(page.params.locale ?? ActivityDefaultValues.sortColumns.languageCode);
      getProviderList(payload);
    }
  }, [page]);
  if (isSkeleton) {
    return (
      <ProviderSectionStyle>
        <ContainerStyle>
          <ProviderGridSkeleton pageSize={payload.rowsPerPage} buttonSize={2} />
        </ContainerStyle>
      </ProviderSectionStyle>
    );
  } else {
    return (
      <ProviderSectionStyle>
        <ContainerStyle>
          <GridTemplateProvider
            header={t("providersList.providers")}
            subHeader={
              <>
                {grid.totalCount} {t("results")}
              </>
            }
            page={"providers"}
            configurations={payload}
            filterConfiguration={filterList}
            dataList={grid.list}
            pageNumber={payload.pageNumber}
            cardType="vertical"
            pageSize={payload.rowsPerPage}
            totalCount={grid.totalCount}
            labelRowsPerPage={t("rowsPerPage")}
            noRecordMessage={t("noRecordMessage")}
            onPageChange={(e, pageNumber) => {
              payload.pageNumber = pageNumber;
              router.replace(`providers?${generateURLFromPayloadProvider(payload)}`, { shallow: true });
            }}
            onRowsPerPageChange={e => {
              payload.pageNumber = 0;
              payload.rowsPerPage = e.target.value;
              router.replace(`providers?${generateURLFromPayloadProvider(payload)}`, { shallow: true });
            }}
            of={t("of")}
          />
        </ContainerStyle>
      </ProviderSectionStyle>
    );
  }
};

export default Page;
