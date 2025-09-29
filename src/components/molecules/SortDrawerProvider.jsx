"use client";
import { ActivityDefaultValues, getSortListProvider } from "@/src/constants";
import { generateURLFromPayloadProvider } from "@/src/utils";
import palette from "@/src/utils/theme/palette";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SortDrawerProvider = params => {
  const t = useTranslations();
  const router = useRouter();

  const sortList = getSortListProvider(t, params, ActivityDefaultValues);

  const payload = params.configuration;

  if (
    sortList.find(
      item =>
        item.value.sortColumnName === params.configuration.sortColumns.sortColumnName &&
        item.value.sortOrder === params.configuration.sortColumns.sortOrder
    ) === undefined
  ) {
    payload.sortColumns.sortColumnName = "";
    payload.sortColumns.sortOrder = "";
    router.replace(`providers?${generateURLFromPayloadProvider(payload)}`, { shallow: true });
  }

  const [drawerSort, setDrawerSort] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    sortList.find(
      item =>
        item.value.sortColumnName === params.configuration.sortColumns.sortColumnName &&
        item.value.sortOrder === params.configuration.sortColumns.sortOrder
    )?.unqID ?? ""
  );

  const toggleSort = () => {
    setDrawerSort(!drawerSort);
    setSelectedValue(
      sortList.find(
        item =>
          item.value.sortColumnName === params.configuration.sortColumns.sortColumnName &&
          item.value.sortOrder === params.configuration.sortColumns.sortOrder
      )?.unqID ?? ""
    );
  };

  return (
    <>
      <Button variant="outlined" color="inherit" disableRipple onClick={toggleSort}>
        {t("sort")}{" "}
        <Chip
          color="primary"
          label={
            sortList.find(
              item =>
                item.value.sortColumnName === params.configuration.sortColumns.sortColumnName &&
                item.value.sortOrder === params.configuration.sortColumns.sortOrder
            )?.displayTitle ?? ""
          }
        />
      </Button>

      <Drawer
        open={drawerSort}
        anchor="right"
        onClose={toggleSort}
        PaperProps={{ sx: { width: { xs: "100%" }, maxWidth: { sm: "383px" } } }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} padding={2}>
          <Typography variant="h6">{t("sort")}</Typography>
          <IconButton onClick={toggleSort} sx={{ padding: "0" }}>
            <Close sx={{ fontSize: "2rem", color: palette.text.primary }} />
          </IconButton>
        </Box>
        <Divider color={palette.divider.divider} />
        <RadioGroup
          value={selectedValue}
          onChange={(e, value) => {
            setSelectedValue(value);
          }}
          sx={{ flex: "1 1 0" }}
        >
          <List sx={{ padding: "1.5rem 1rem" }}>
            {sortList.map(sortItem => (
              <ListItem key={sortItem.unqID} disablePadding sx={{ paddingBottom: "1.5rem" }}>
                <FormControlLabel
                  sx={{ alignItems: "flex-start", width: "100%" }}
                  value={sortItem.unqID}
                  control={<Radio edge="end" sx={{ paddingTop: "0" }} />}
                  disabled={sortItem.disable}
                  labelPlacement="start"
                  label={
                    <>
                      <Typography variant="body1" fontWeight={500} mb={0.25}>
                        {sortItem.displayTitle}
                      </Typography>
                      <Typography variant="body2">{sortItem.displaySubTitle}</Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </RadioGroup>
        <Box padding={2}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              const selectedItem = sortList.find(item => item.unqID === selectedValue);
              payload.pageNumber = 0;
              payload.sortColumns.sortColumnName = selectedItem.value.sortColumnName;
              payload.sortColumns.sortOrder = selectedItem.value.sortOrder;
              router.replace(`providers?${generateURLFromPayloadProvider(payload)}`, { shallow: true });
              toggleSort();
            }}
          >
            {t("save")}
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default SortDrawerProvider;
