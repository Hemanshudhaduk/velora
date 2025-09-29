"use client";

import palette from "@/src/utils/theme/palette";
import { Grid, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CustomCard, CustomLink } from "../atoms";
import ViewMore from "./ViewMoreComponent";

const MobileCategoryList = props => {
  const { categoryList } = props;
  const [categoriesView, setCategoriesView] = useState(categoryList?.slice(0, 3));
  const t = useTranslations();
  const getCategoryCount = async pageSize => {
    setCategoriesView(categoryList?.slice(0, pageSize));
  };
  return (
    <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} display={{ xs: "flex", sm: "none" }}>
      {categoriesView.map((item, index) => {
        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CustomLink
              href={`/activity?category=${item.unqGuid}`}
              disc={<CustomCard title={item.name} src={item.imageUrl} />}
            />
          </Grid>
        );
      })}
      {categoriesView?.length < categoryList?.length ? (
        <Grid item xs={12} textAlign="center">
          <ViewMore
            title={
              <Typography
                variant="body1"
                fontWeight={600}
                color={palette.text.secondary}
                textAlign="center"
                sx={{ textDecoration: "none" }}
              >
                {t("signUp.viewAllCategories")}
              </Typography>
            }
            defaultPageSize={3}
            pageSize={6}
            clickHandler={getCategoryCount}
          />
        </Grid>
      ) : null}
    </Grid>
  );
};

export default MobileCategoryList;
