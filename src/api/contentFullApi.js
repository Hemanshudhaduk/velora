import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { createClient } from "contentful";

const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: space,
  accessToken: accessToken,
});

export async function getArticlesById(id, locale) {
  const response = await client.getEntries({
    content_type: "hMagazineArticles",
    "sys.id": id,
    locale: locale,
  });

  await client
    .getEntry(id, { locale })
    .then(entry => {
      const rawRichTextField = entry.fields.bodyText;
      return documentToHtmlString(rawRichTextField, {
        renderNode: {
          "embedded-asset-block": node => {
            const field = node.data.target.fields;
            // Render embedded asset block node
            return `<img src="${field.file?.url}" alt="${field.title}" style="max-width: 100%; border-radius: 12px; object-fit: contain; height: auto;">`;
          },
          "embedded-entry-inline": node => {},
        },
      });
    })
    .then(renderedHtml => {
      response.items[0].htmlDom = renderedHtml;
    })
    .catch(error => console.log(error));
  return response.items[0];
}

export async function getCategoryList(payload) {
  payload.pageNumber++;

  const response = await client.getEntries({
    content_type: "hMagazineCategories",
    locale: payload.locale,
    limit: payload.rowsPerPage ?? 0,
    skip: payload.rowsPerPage ? payload.rowsPerPage * (payload.pageNumber - 1) : 0,
  });

  if (payload.rowsPerPage) {
    return response;
  } else {
    if (response.total > 0) {
      payload.pageNumber = 0;
      payload.rowsPerPage = response.total;
      const res = await getCategoryList(payload);
      return res;
    } else {
      return null;
    }
  }
}

export async function getArticlesList(payload, isViewMore) {
  payload.pageNumber++;
  const query = {
    content_type: "hMagazineArticles",
    locale: payload.locale,
    limit: payload.rowsPerPage ?? 0,
    skip: isViewMore
      ? (payload.rowsPerPage - 1) * (payload.pageNumber - 1)
      : payload.rowsPerPage
        ? payload.rowsPerPage * (payload.pageNumber - 1)
        : 0,
  };

  if (payload.filterColumns?.category?.length > 0) {
    query[`fields.category.sys.id[in]`] = payload.filterColumns?.category;
  }
  if (payload.filterColumns?.author?.length > 0) {
    query[`fields.author.sys.id[in]`] = payload.filterColumns?.author;
  }

  if (payload.query) {
    payload.query.forEach(item => (query[item.key] = item.value));
  }

  if (
    payload.filterColumns?.search !== "" &&
    payload.filterColumns?.search !== undefined &&
    payload.filterColumns?.search !== null
  ) {
    query[`fields.mainHeader[match]`] = payload.filterColumns?.search;
  }

  const response = await client.getEntries(query);

  if (payload.rowsPerPage) {
    return response;
  } else {
    if (response.total > 0) {
      payload.pageNumber = 0;
      payload.rowsPerPage = response.total;
      const res = await getArticlesList(payload);
      return res;
    } else {
      return null;
    }
  }
}

export async function getAuthorList(payload) {
  payload.pageNumber++;

  const response = await client.getEntries({
    content_type: "hMagazineAuthors",
    locale: payload.locale,
    limit: payload.rowsPerPage ?? 0,
    skip: payload.rowsPerPage ? payload.rowsPerPage * (payload.pageNumber - 1) : 0,
    order: "-sys.createdAt",
  });

  if (payload.rowsPerPage) {
    return response;
  } else {
    if (response.total > 0) {
      payload.pageNumber = 0;
      payload.rowsPerPage = response.total;
      const res = await getAuthorList(payload);
      return res;
    } else {
      return null;
    }
  }
}
