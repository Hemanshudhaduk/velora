import { getArticlesById, getArticlesList } from "@/src/api/contentFullApi";
import { ArticlesDetailTemplate } from "@/src/components";

const Page = async ({ params }) => {
  const { id, locale } = params;
  const article = await getArticlesById(id, locale);
  const relatedArticles = await getArticlesList({
    pageNumber: 0,
    locale: locale,
    rowsPerPage: 4,
    filterColumns: { category: article.fields.category.sys.id },
    query: [{ key: "sys.id[ne]", value: id }],
  });

  return <ArticlesDetailTemplate article={article} relatedArticles={relatedArticles} />;
};

export default Page;
