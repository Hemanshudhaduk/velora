"use client";
import { getArticlesList, getAuthorList } from "@/src/api/contentFullApi";
import ProviderGridSkeleton from "@/src/components/skeletons/ProviderGridSkeleton";
import { ContainerStyle, ProviderSectionStyle } from "@/src/components/style";
import GridTemplateProvider from "@/src/components/templates/GridTemplateProvider";
import { generateConfigurationAuthors, generateURLFromPayloadAuthors } from "@/src/utils/common/functions";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = page => {
  const [isSkeleton, setIsSkeleton] = useState(true);
  const t = useTranslations();
  const router = useRouter();
  const [grid, setGrid] = useState({ list: [], totalCount: 0 });

  const PerformDataList = (response, articles) => {
    if (response) {
      setGrid({
        list: response.items?.map(item => ({
          title: item?.fields?.name,
          imageUrl: `${
            item?.fields?.picture?.fields?.file?.url === null ||
            item?.fields?.picture?.fields?.file?.url === undefined ||
            item?.fields?.picture?.fields?.file?.url === ""
              ? ""
              : `https:${item.fields.picture.fields.file.url}`
          }`,
          noImageText: t("noPictureText"),
          locationText: item?.fields?.authorExternalUrl,
          bottomRight: [
            {
              reference: `/articles?author=${item.sys.id}`,
              label: t("content.viewArticles", {
                count: articles?.items?.filter(article => article.fields.author.sys.id === item.sys.id).length,
              }),
              variant: "view",
            },
          ],
        })),
        totalCount: response.total ?? 0,
      });

      if (payload.pageNumber > Math.ceil(response.total / payload.rowsPerPage) && response.total > 0) {
        payload.pageNumber = 0;
        router.replace(`authors?${generateURLFromPayloadAuthors(payload)}`, { shallow: true });
      }
    } else {
      setGrid({ list: [], totalCount: 0 });
    }
  };

  const FetchAuthorList = async payload => {
    setIsSkeleton(true);
    const author = await getAuthorList({ ...payload });
    if (author) {
      const articlesPayload = {
        pageNumber: 0,
        rowsPerPage: undefined,
        locale: page?.params?.locale ?? AuthorsDefaultValues.languageCode,
      };

      const articles = await getArticlesList(articlesPayload);
      PerformDataList(author, articles);
    }
    setIsSkeleton(false);
  };

  const payload = generateConfigurationAuthors(page);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof page === "object" && page !== undefined) {
      FetchAuthorList(payload);
      const url = generateURLFromPayloadAuthors(payload);
      if (!(url === undefined || url === null || url === "")) router.replace(`authors?${url}`, { shallow: true });
    }
  }, [page]);

  if (isSkeleton) {
    return (
      <ProviderSectionStyle>
        <ContainerStyle>
          <ProviderGridSkeleton pageSize={payload.rowsPerPage} buttonSize={0} />
        </ContainerStyle>
      </ProviderSectionStyle>
    );
  } else {
    return (
      <ProviderSectionStyle>
        <ContainerStyle>
          <GridTemplateProvider
            header={t("content.authors")}
            subHeader={
              <>
                {grid.totalCount} {t("results")}
              </>
            }
            page={"authors"}
            dataList={grid.list}
            pageNumber={payload.pageNumber}
            cardType="vertical"
            pageSize={payload.rowsPerPage}
            totalCount={grid.totalCount}
            labelRowsPerPage={t("rowsPerPage")}
            noRecordMessage={t("noRecordMessage")}
            onPageChange={(e, pageNumber) => {
              payload.pageNumber = pageNumber;
              router.replace(`authors?${generateURLFromPayloadAuthors(payload)}`, { shallow: true });
            }}
            onRowsPerPageChange={e => {
              payload.pageNumber = 0;
              payload.rowsPerPage = e.target.value;
              router.replace(`authors?${generateURLFromPayloadAuthors(payload)}`, { shallow: true });
            }}
            of={t("of")}
          />
        </ContainerStyle>
      </ProviderSectionStyle>
    );
  }
};

export default Page;
