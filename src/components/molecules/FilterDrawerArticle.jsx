"use client";
import { ArticlesDefaultValues } from "@/src/constants";
import { generateURLFromPayloadArticles } from "@/src/utils";
import palette from "@/src/utils/theme/palette";
import { Close } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ArticleSearchBox from "./ArticleSearchBox";

const FilterDrawerArticle = params => {
  const t = useTranslations();

  const [drawerFilter, setDrawerFilter] = useState(false);

  const toggleFilter = () => {
    setFilterColumns({ ...params.configuration.filterColumns });
    setDrawerFilter(!drawerFilter);
  };

  const [filterColumns, setFilterColumns] = useState({ ...params.configuration.filterColumns });
  const filterLists = params.filterConfiguration;

  let filterCount = 0;
  filterCount =
    filterColumns.category?.length !== ArticlesDefaultValues.filterColumns.category.length
      ? filterCount + 1
      : filterCount;
  filterCount =
    filterColumns.author?.length !== ArticlesDefaultValues.filterColumns.author.length ? filterCount + 1 : filterCount;

  if (filterLists?.category) {
    const inCorrectCategory = filterColumns.category?.filter(
      item => !filterLists?.category?.map(category => category.unqGUID).includes(item)
    );
    if (inCorrectCategory?.length > 0) {
      params.configuration.filterColumns.category = params.configuration.filterColumns.category?.filter(
        item => !inCorrectCategory.includes(item)
      );
      const payload = params.configuration;
      params.setUrl(generateURLFromPayloadArticles(payload));
    }
  }
  if (filterLists?.author) {
    const inCorrectAuthor = filterColumns.author?.filter(
      item => !filterLists?.author?.map(author => author.unqGUID).includes(item)
    );
    if (inCorrectAuthor?.length > 0) {
      params.configuration.filterColumns.author = params.configuration.filterColumns.author.filter(
        item => !inCorrectAuthor.includes(item)
      );
      const payload = params.configuration;
      params.setUrl(generateURLFromPayloadArticles(payload));
    }
  }

  return (
    <>
      <Button variant="outlined" color="inherit" href={`/articles/authors`}>
        {t("content.viewAuthors")}
      </Button>
      <ArticleSearchBox />
      <Button variant="outlined" color="inherit" disableRipple onClick={toggleFilter}>
        {t("filter")}
        {filterCount === 0 ? null : <Chip color="primary" label={filterCount} />}
      </Button>
      <Drawer
        open={drawerFilter}
        anchor="right"
        onClose={toggleFilter}
        PaperProps={{ sx: { width: { xs: "100%" }, maxWidth: { sm: "383px" } } }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} padding={2}>
          <Typography variant="h6">{t("filter")}</Typography>
          <IconButton onClick={toggleFilter} sx={{ padding: "0" }}>
            <Close sx={{ fontSize: "2rem", color: palette.text.primary }} />
          </IconButton>
        </Box>
        <Divider color={palette.divider.divider} />
        <Box flex="1 1 0" sx={{ overflow: "auto" }}>
          {/* Category */}
          <Box py={3} px={2}>
            <Typography variant="body2" color={palette.text.primary} mb={1}>
              {t("content.category")}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1} spacing={0.00001}>
              {filterLists?.category?.map(item => (
                <FormControlLabel
                  key={item.unqGUID}
                  value={item.unqGUID}
                  control={
                    <Chip
                      key={item.unqGUID}
                      value={item.unqGUID}
                      color={filterColumns.category?.includes(item.unqGUID) ? "primary" : "default"}
                      label={item.title}
                      onClick={() => {
                        const category = [...filterColumns.category];
                        if (filterColumns.category?.includes(item.unqGUID)) {
                          category.splice(filterColumns.category?.indexOf(item.unqGUID), 1);
                          setFilterColumns({ ...filterColumns, category: category });
                        } else {
                          category.push(item.unqGUID);
                          setFilterColumns({ ...filterColumns, category: category });
                        }
                      }}
                    />
                  }
                />
              ))}
            </Stack>
          </Box>
          <Divider color={palette.divider.divider} />

          {/* Author */}
          <Box py={3} px={2}>
            <Typography variant="body2" color={palette.text.primary} mb={1}>
              {t("content.author")}
            </Typography>
            <Autocomplete
              value={filterLists?.author?.filter(item => filterColumns.author?.includes(item.unqGUID)) ?? []}
              multiple
              onChange={(e, value) => {
                filterColumns.author = value.map(item => item.unqGUID);
                setFilterColumns({ ...filterColumns, author: filterColumns.author });
              }}
              ListboxProps={{
                style: { maxHeight: 200, overflow: "auto" },
              }}
              renderOption={(props, option) => (
                <li {...props} key={option.unqGUID}>
                  {option.title}
                </li>
              )}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((option, index) => (
                  <Chip {...getTagProps({ index })} key={option.unqGUID} label={option.title} />
                ))
              }
              getOptionLabel={option => option.title}
              options={filterLists?.author ?? []}
              filterSelectedOptions
              noOptionsText={t("noOptionsMessage")}
              isOptionEqualToValue={(options, value) => options.unqGUID === value.unqGUID}
              renderInput={params => (
                <TextField {...params} placeholder={filterColumns?.author?.length > 0 ? "" : t("all")} />
              )}
            />
          </Box>
        </Box>
        {/* Save */}
        <Box padding={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              const payload = params.configuration;

              payload.pageNumber = 0;

              payload.filterColumns = filterColumns;

              toggleFilter();

              params.setUrl(generateURLFromPayloadArticles(payload));
            }}
          >
            {t("save")}
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default FilterDrawerArticle;
