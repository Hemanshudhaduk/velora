"use client";
import { fetchActivityList, fetchFilterList } from "@/src/api/activity";
import { GridSkeleton } from "@/src/components/skeletons";
import { ContainerStyle, SectionStyle } from "@/src/components/style";
import { GridTemplate } from "@/src/components/templates";
import { selectLocationChanged } from "@/src/lib/slice/userSlice";
import { generateConfiguration, generateURLFromPayload } from "@/src/utils/common/functions";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Page(page) {
  const [isSkeleton, setIsSkeleton] = useState(true);
  const t = useTranslations();
  const router = useRouter();
  const [grid, setGrid] = useState({ list: [], totalCount: 0 });
  const [filterList, setFilterList] = useState(null);
  const getLocationChanged = useSelector(selectLocationChanged);

  const payload = generateConfiguration(page);

  const getActivityList = async payload => {
    setIsSkeleton(true);
    await fetchActivityList({ ...payload }, setGrid, t, router);
    setIsSkeleton(false);
  };

  const getFiltersList = async languageCode => {
    const response = await fetchFilterList(languageCode, "activity");
    if (response?.status === "Success") {
      setFilterList(response.data);
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("latitude") !== undefined &&
      localStorage.getItem("latitude") !== null &&
      localStorage.getItem("latitude") !== ""
    ) {
      getFiltersList(page.params.locale ?? ActivityDefaultValues.sortColumns.languageCode);
      getActivityList(payload);
    } else {
      localStorage.setItem("isLatLonRequired", true);
    }
  }, [page, getLocationChanged]);
  if (isSkeleton) {
    return (
      <SectionStyle>
        <ContainerStyle sx={{ gap: "20px", display: "flex", flexDirection: "column" }}>
          <GridSkeleton pageSize={payload.rowsPerPage} />
        </ContainerStyle>
      </SectionStyle>
    );
  } else {
    return (
      <SectionStyle>
        <ContainerStyle>
          <GridTemplate
            header={t("activities")}
            subHeader={
              <>
                {grid.totalCount} {t("results")}
              </>
            }
            configurations={payload}
            filterConfiguration={filterList}
            dataList={grid.list}
            pageNumber={payload.pageNumber}
            cardType="horizontal"
            pageSize={payload.rowsPerPage}
            totalCount={grid.totalCount}
            labelRowsPerPage={t("rowsPerPage")}
            noRecordMessage={t("noRecordMessage")}
            onPageChange={(e, pageNumber) => {
              payload.pageNumber = pageNumber;
              router.replace(`activity?${generateURLFromPayload(payload)}`, { shallow: true });
            }}
            onRowsPerPageChange={e => {
              payload.pageNumber = 0;
              payload.rowsPerPage = e.target.value;
              router.replace(`activity?${generateURLFromPayload(payload)}`, { shallow: true });
            }}
            of={t("of")}
          />
        </ContainerStyle>
      </SectionStyle>
    );
  }
}
