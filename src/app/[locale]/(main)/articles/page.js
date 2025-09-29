"use client";
import { getArticlesList, getAuthorList, getCategoryList } from "@/src/api/contentFullApi";
import { ArticleGridSkeleton } from "@/src/components/skeletons";
import { ContainerStyle, ProviderSectionStyle } from "@/src/components/style";
import GridTemplateProvider from "@/src/components/templates/GridTemplateProvider";
import { generateConfigurationArticles, generateURLFromPayloadArticles } from "@/src/utils/common/functions";
import moment from "moment/moment";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = page => {
  const [isSkeleton, setIsSkeleton] = useState(true);
  const t = useTranslations();
  const router = useRouter();
  const [grid, setGrid] = useState({ list: [], totalCount: 0 });
  const [url, setUrl] = useState("");
  const [filterList, setFilterList] = useState(null);

  const PerformDataList = response => {
    if (response) {
      setGrid({
        list: response.items?.map(item => ({
          href: `articles/${item.sys.id}`,
          imageUrl: `${
            item?.fields?.mainPicture?.fields?.file?.url === null ||
            item?.fields?.mainPicture?.fields?.file?.url === undefined ||
            item?.fields?.mainPicture?.fields?.file?.url === ""
              ? ""
              : `https:${item.fields.mainPicture.fields.file.url}`
          }`,
          noImageText: t("noPictureText"),
          tag: item?.fields?.category?.fields?.categoryName,
          title: item?.fields?.mainHeader,
          description: item?.fields?.articleSummary,
          bottomImageUrl: `${
            item?.fields?.author?.fields?.picture?.fields?.file?.url === null ||
            item?.fields?.author?.fields?.picture?.fields?.file?.url === undefined ||
            item?.fields?.author?.fields?.picture?.fields?.file?.url === ""
              ? ""
              : `https:${item.fields.author.fields.picture.fields.file.url}`
          }`,
          bottomImageTitle: item.fields?.author?.fields?.name,
          bottomImageDescription: moment(item.fields?.publishDate)
            ?.locale(t("languageCode"))
            ?.format(`ddd, DD MMM yyyy`),
        })),
        totalCount: response.total ?? 0,
      });
      if (payload.pageNumber > Math.ceil(response.total / payload.rowsPerPage)) {
        payload.pageNumber = 0;
        setUrl(generateURLFromPayloadArticles(payload));
      }
    } else {
      setGrid({ list: [], totalCount: 0 });
    }
  };

  const FetchArticleList = async payload => {
    setIsSkeleton(true);
    const articles = await getArticlesList({ ...payload });
    PerformDataList(articles);
    const categoryData = await getCategoryList({
      pageNumber: 0,
      rowsPerPage: 0,
      locale: page?.params?.locale ?? ArticlesDefaultValues.languageCode,
    });
    const authorData = await getAuthorList({
      pageNumber: 0,
      rowsPerPage: 0,
      locale: page?.params?.locale ?? ArticlesDefaultValues.languageCode,
    });
    setFilterList({
      category: categoryData?.items?.map(category => ({
        title: category.fields.categoryName,
        unqGUID: category.sys.id,
      })),
      author: authorData?.items?.map(author => ({ title: author.fields.name, unqGUID: author.sys.id })),
    });
    setIsSkeleton(false);
  };

  const payload = generateConfigurationArticles(page);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof page === "object" && page !== undefined) {
      FetchArticleList(payload);

      setUrl(generateURLFromPayloadArticles(payload));
    }
  }, [page]);

  useEffect(() => {
    router.replace(`articles?${url}`, { shallow: true });
  }, [url]);

  if (isSkeleton) {
    return (
      <ProviderSectionStyle>
        <ContainerStyle>
          <ArticleGridSkeleton pageSize={payload.rowsPerPage} buttonSize={3} />
        </ContainerStyle>
      </ProviderSectionStyle>
    );
  } else {
    return (
      <ProviderSectionStyle>
        <ContainerStyle>
          <GridTemplateProvider
            header={t("content.articles")}
            subHeader={
              <>
                {grid.totalCount} {t("results")}
              </>
            }
            page={"articles"}
            configurations={payload}
            filterConfiguration={filterList}
            setUrl={setUrl}
            dataList={grid.list}
            pageNumber={payload.pageNumber}
            cardType="horizontal3"
            pageSize={payload.rowsPerPage}
            totalCount={grid.totalCount}
            labelRowsPerPage={t("rowsPerPage")}
            noRecordMessage={t("noRecordMessage")}
            onPageChange={(e, pageNumber) => {
              payload.pageNumber = pageNumber;
              setUrl(generateURLFromPayloadArticles(payload));
            }}
            onRowsPerPageChange={e => {
              payload.pageNumber = 0;
              payload.rowsPerPage = e.target.value;
              setUrl(generateURLFromPayloadArticles(payload));
            }}
            of={t("of")}
          />
        </ContainerStyle>
      </ProviderSectionStyle>
    );
  }
};

export default Page;
