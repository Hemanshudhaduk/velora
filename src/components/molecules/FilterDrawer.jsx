"use client";
import { ActivityDefaultValues, specialCharacterRegex } from "@/src/constants";
import { generateURLFromPayload } from "@/src/utils";
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
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CommonSnackBar, SnackState } from "../atoms";

const FilterDrawer = params => {
  const t = useTranslations();
  const router = useRouter();
  const [snack, closeSnack, showSnackbar] = SnackState();

  const [drawerFilter, setDrawerFilter] = useState(false);

  const toggleFilter = () => {
    setFilterColumns({ ...params.configuration.filterColumns });
    setDrawerFilter(!drawerFilter);
  };

  const [filterColumns, setFilterColumns] = useState({ ...params.configuration.filterColumns });
  const filterLists = params.filterConfiguration;

  let filterCount = 1;
  filterCount =
    filterColumns.priceFrom >= ActivityDefaultValues.filterColumns.priceFromMinValue ? filterCount + 1 : filterCount;
  filterCount =
    filterColumns.priceTo >= ActivityDefaultValues.filterColumns.priceToMinValue ? filterCount + 1 : filterCount;
  filterCount =
    filterColumns.activityName !== ActivityDefaultValues.filterColumns.activityName ? filterCount + 1 : filterCount;
  filterCount =
    filterColumns.supportingType?.length !== ActivityDefaultValues.filterColumns.supportingType.length
      ? filterCount + 1
      : filterCount;
  filterCount =
    filterColumns.category?.length !== ActivityDefaultValues.filterColumns.category.length
      ? filterCount + 1
      : filterCount;
  filterCount =
    filterColumns.topic?.length !== ActivityDefaultValues.filterColumns.topic.length ? filterCount + 1 : filterCount;
  filterCount =
    filterColumns.city?.length !== ActivityDefaultValues.filterColumns.city.length ? filterCount + 1 : filterCount;
  filterCount =
    filterColumns.symptoms?.length !== ActivityDefaultValues.filterColumns.symptoms.length
      ? filterCount + 1
      : filterCount;

  if (filterLists?.supportingType) {
    const inCorrectSupportingTypes = filterColumns.supportingType.filter(
      item => !filterLists?.supportingType.map(supporting => supporting.unqGUID).includes(item)
    );
    if (inCorrectSupportingTypes.length > 0) {
      params.configuration.filterColumns.supportingType = params.configuration.filterColumns.supportingType.filter(
        item => !inCorrectSupportingTypes.includes(item)
      );
      const payload = { ...params.configuration };
      router.replace(`activity?${generateURLFromPayload(payload)}`, { shallow: true });
    }
  }
  if (filterLists?.category) {
    const inCorrectCategory = filterColumns.category.filter(
      item => !filterLists?.category.map(category => category.unqGUID).includes(item)
    );
    if (inCorrectCategory.length > 0) {
      params.configuration.filterColumns.category = params.configuration.filterColumns.category.filter(
        item => !inCorrectCategory.includes(item)
      );
      const payload = params.configuration;
      router.replace(`activity?${generateURLFromPayload(payload)}`, { shallow: true });
    }
  }
  if (filterLists?.topic) {
    const inCorrectTopic = filterColumns.topic.filter(
      item => !filterLists?.topic.map(topic => topic.unqGUID).includes(item)
    );
    if (inCorrectTopic.length > 0) {
      params.configuration.filterColumns.topic = params.configuration.filterColumns.topic.filter(
        item => !inCorrectTopic.includes(item)
      );
      const payload = params.configuration;
      router.replace(`activity?${generateURLFromPayload(payload)}`, { shallow: true });
    }
  }
  if (filterLists?.symptom) {
    const inCorrectSymptom = filterColumns.symptoms.filter(
      item => !filterLists?.symptom.map(symptom => symptom.unqGUID).includes(item)
    );
    if (inCorrectSymptom.length > 0) {
      params.configuration.filterColumns.symptoms = params.configuration.filterColumns.symptoms.filter(
        item => !inCorrectSymptom.includes(item)
      );
      const payload = params.configuration;
      router.replace(`activity?${generateURLFromPayload(payload)}`, { shallow: true });
    }
  }
  if (filterLists?.city) {
    const inCorrectCity = filterColumns.city.filter(
      item => !params.filterConfiguration.city.map(city => city.title).includes(item)
    );
    if (inCorrectCity.length > 0) {
      params.configuration.filterColumns.city = params.configuration.filterColumns.city.filter(
        item => !inCorrectCity.includes(item)
      );
      const payload = params.configuration;
      router.replace(`activity?${generateURLFromPayload(payload)}`, { shallow: true });
    }
  }

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        disableRipple
        onClick={toggleFilter}
        sx={{ padding: { xs: "8px 16px", sm: "12px 24px" }, fontSize: { xs: "14px", sm: "16px" } }}
      >
        {t("filter")}
        <Chip color="primary" label={filterCount} />
      </Button>
      <Drawer
        open={drawerFilter}
        anchor="right"
        onClose={toggleFilter}
        PaperProps={{ sx: { width: { xs: "100%" }, maxWidth: { sm: "383px" } } }}
      >
        {/* Title */}
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} padding={2}>
          <Typography variant="h6">{t("filter")}</Typography>
          <IconButton onClick={toggleFilter} sx={{ padding: "0" }}>
            <Close sx={{ fontSize: "2rem", color: palette.text.primary }} />
          </IconButton>
        </Box>
        <Divider color={palette.divider.divider} />

        <Box flex="1 1 0" sx={{ overflow: "auto" }}>
          {/* Price From & To*/}
          <Grid container spacing={1} py={3} px={2}>
            <Grid item xs={6}>
              <Typography variant="body2" color={palette.text.primary} mb={1}>
                {t("priceFrom")}
              </Typography>
              <TextField
                value={
                  filterColumns.priceFrom >= ActivityDefaultValues.filterColumns.priceFromMinValue
                    ? filterColumns.priceFrom
                    : ""
                }
                inputProps={{
                  step: 1,
                }}
                onChange={e => {
                  if (
                    parseFloat(e.target.value) >= ActivityDefaultValues.filterColumns.priceFromMinValue &&
                    parseFloat(e.target.value) <= ActivityDefaultValues.filterColumns.maxPrice
                  )
                    setFilterColumns({ ...filterColumns, priceFrom: parseFloat(e.target.value) });
                  else if (e.target.value === "") setFilterColumns({ ...filterColumns, priceFrom: -1 });
                }}
                size="small"
                type="number"
                placeholder={t("min")}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color={palette.text.primary} mb={1}>
                {t("priceTo")}
              </Typography>
              <TextField
                value={
                  filterColumns.priceTo >= ActivityDefaultValues.filterColumns.priceToMinValue
                    ? filterColumns.priceTo
                    : ""
                }
                inputProps={{
                  step: 1,
                }}
                onChange={e => {
                  if (
                    parseFloat(e.target.value) >= ActivityDefaultValues.filterColumns.priceToMinValue &&
                    parseFloat(e.target.value) <= ActivityDefaultValues.filterColumns.maxPrice
                  )
                    setFilterColumns({ ...filterColumns, priceTo: parseFloat(e.target.value) });
                  else if (e.target.value === "") setFilterColumns({ ...filterColumns, priceTo: -1 });
                }}
                size="small"
                type="number"
                placeholder={t("max")}
              />
            </Grid>
          </Grid>
          {/* <Divider color={palette.divider.divider} /> */}

          {/* Activity Name */}
          {/* <Box py={3} px={2}>
            <Typography variant="body2" color={palette.text.primary} mb={1}>
              {t("activityName")}
            </Typography>
            <TextField
              value={filterColumns.activityName}
              onChange={e => {
                if (!specialCharacterRegex.test(e.target.value))
                  setFilterColumns({ ...filterColumns, activityName: e.target.value });
              }}
              size="small"
              type="text"
              placeholder={t("typeAName")}
            />
          </Box>
          <Divider color={palette.divider.divider} /> */}

          {/* Supporting Type */}
          {/* <Box py={3} px={2}>
            <Typography variant="body2" color={palette.text.primary} mb={1}>
              {t("type")}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1} spacing={0.00001}>
              {filterLists?.supportingType?.map(item => (
                <FormControlLabel
                  key={item.unqGUID}
                  value={item.unqGUID}
                  control={
                    <Chip
                      key={item.unqGUID}
                      value={item.unqGUID}
                      color={filterColumns.supportingType.includes(item.unqGUID) ? "primary" : "default"}
                      label={item.title}
                      onClick={() => {
                        const supporting = [...filterColumns.supportingType];
                        if (filterColumns.supportingType.includes(item.unqGUID)) {
                          supporting.splice(filterColumns.supportingType.indexOf(item.unqGUID), 1);
                          setFilterColumns({ ...filterColumns, supportingType: supporting });
                        } else {
                          supporting.push(item.unqGUID);
                          setFilterColumns({ ...filterColumns, supportingType: supporting });
                        }
                      }}
                    />
                  }
                />
              ))}
            </Stack>
          </Box>
          <Divider color={palette.divider.divider} /> */}

          {/* Category */}
          {/* <Box py={3} px={2}>
            <Typography variant="body2" color={palette.text.primary} mb={1}>
              {t("category")}
            </Typography>
            <Autocomplete
              value={filterLists?.category.filter(item => filterColumns.category.includes(item.unqGUID)) ?? []}
              multiple
              onChange={(e, value) => {
                filterColumns.category = value.map(item => item.unqGUID);
                setFilterColumns({ ...filterColumns, category: filterColumns.category });
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
                  <Chip {...getTagProps({ index })} key={option.unqGUID} label={option.title} deleteIcon={<Close />} />
                ))
              }
              getOptionLabel={option => option.title}
              options={filterLists?.category ?? []}
              filterSelectedOptions
              noOptionsText={t("noOptionsMessage")}
              isOptionEqualToValue={(options, value) => options.unqGUID === value.unqGUID}
              renderInput={params => (
                <TextField {...params} placeholder={filterColumns?.category.length > 0 ? "" : t("all")} />
              )}
            />
          </Box>
          <Divider color={palette.divider.divider} /> */}

          {/* Topic */}
          {/* <Box py={3} px={2}>
            <Typography variant="body2" color={palette.text.primary} mb={1}>
              {t("topic")}
            </Typography>
            <Autocomplete
              value={filterLists?.topic.filter(item => filterColumns.topic.includes(item.unqGUID)) ?? []}
              multiple
              onChange={(e, value) => {
                filterColumns.topic = value.map(item => item.unqGUID);
                setFilterColumns({ ...filterColumns, topic: filterColumns.topic });
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
                  <Chip {...getTagProps({ index })} key={option.unqGUID} label={option.title} deleteIcon={<Close />} />
                ))
              }
              getOptionLabel={option => option.title}
              options={filterLists?.topic ?? []}
              filterSelectedOptions
              noOptionsText={t("noOptionsMessage")}
              isOptionEqualToValue={(options, value) => options.unqGUID === value.unqGUID}
              renderInput={params => (
                <TextField {...params} placeholder={filterColumns?.topic.length > 0 ? "" : t("all")} />
              )}
            />
          </Box>
          <Divider color={palette.divider.divider} /> */}

          {/* City */}
          {/* <Box py={3} px={2}>
            <Typography
              variant="body2"
              color={palette.text.primary}
              mb={1}
              display={filterColumns.activityType === ActivityDefaultValues.filterColumns.virtualActivityType}
            >
              {t("city")}
            </Typography>
            <Autocomplete
              disabled={filterColumns.activityType === ActivityDefaultValues.filterColumns.virtualActivityType}
              value={filterLists?.city.filter(item => filterColumns.city.includes(item.title)) ?? []}
              multiple
              onChange={(e, value) => {
                filterColumns.city = value.map(item => item.title);
                setFilterColumns({ ...filterColumns, city: filterColumns.city });
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
                  <Chip {...getTagProps({ index })} key={option.unqGUID} label={option.title} deleteIcon={<Close />} />
                ))
              }
              getOptionLabel={option => option.title}
              options={filterLists?.city ?? []}
              filterSelectedOptions
              noOptionsText={t("noOptionsMessage")}
              isOptionEqualToValue={(options, value) => options.unqGUID === value.unqGUID}
              renderInput={params => (
                <TextField {...params} placeholder={filterColumns?.city.length > 0 ? "" : t("all")} />
              )}
            />
          </Box>
          <Divider color={palette.divider.divider} /> */}

          {/* Activity Type */}
          {/* <Box py={3} px={2}>
            <Typography variant="body2" color={palette.text.primary} mb={1}>
              {t("activityType")}
            </Typography>
            <RadioGroup
              row
              sx={{ flexWrap: "nowrap", gap: "0.5rem" }}
              value={filterColumns.activityType}
              onChange={(e, value) => {
                setFilterColumns({ ...filterColumns, activityType: value }); // You can you e.target.value as well
              }}
            >
              <FormControlLabel
                key={"In-Person"}
                value={"In-Person"}
                control={<Radio sx={{ display: "none" }} />}
                label={
                  <Chip
                    label={t("in-person")}
                    color={
                      filterColumns.activityType === ActivityDefaultValues.filterColumns.activityType
                        ? "primary"
                        : "default"
                    }
                  />
                }
              />
              <FormControlLabel
                key={"OnlineCall"}
                value={"OnlineCall"}
                control={<Radio sx={{ display: "none" }} />}
                label={
                  <Chip
                    label={t("onlinecall")}
                    color={
                      filterColumns.activityType === ActivityDefaultValues.filterColumns.virtualActivityType
                        ? "primary"
                        : "default"
                    }
                  />
                }
              />
            </RadioGroup>
          </Box>
          <Divider color={palette.divider.divider} /> */}

          {/* Symptom */}
          {/* <Box py={3} px={2}>
            <Typography gutterBottom variant="body2">
              {t("symptoms")}
            </Typography>
            <Autocomplete
              value={filterLists?.symptom.filter(item => filterColumns.symptoms?.includes(item.unqGUID)) ?? []}
              multiple
              onChange={(e, value) => {
                filterColumns.symptoms = value.map(item => item.unqGUID);
                setFilterColumns({ ...filterColumns, symptoms: filterColumns.symptoms });
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
              options={filterLists?.symptom ?? []}
              filterSelectedOptions
              noOptionsText={t("noOptionsMessage")}
              isOptionEqualToValue={(options, value) => options.unqGUID === value.unqGUID}
              renderInput={params => (
                <TextField {...params} placeholder={filterColumns?.symptoms.length > 0 ? "" : t("all")} />
              )}
            />
          </Box> */}
        </Box>
        {/* Save */}
        <Box padding={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => {
              const payload = params.configuration;
              if (
                filterColumns.priceFrom > filterColumns.priceTo &&
                filterColumns.priceTo >= ActivityDefaultValues.filterColumns.priceToMinValue
              ) {
                showSnackbar(t("priceOverlappingMessage"), "error");
              } else {
                payload.pageNumber = 0;
                if (filterColumns.activityType === ActivityDefaultValues.filterColumns.virtualActivityType)
                  filterColumns.city = [];
                payload.filterColumns = filterColumns;

                router.replace(`activity?${generateURLFromPayload(payload)}`, { shallow: true });

                toggleFilter();
              }
            }}
          >
            {t("save")}
          </Button>
        </Box>
      </Drawer>
      <CommonSnackBar snackObj={snack} closeSnack={closeSnack} buttonProp />
    </>
  );
};

export default FilterDrawer;
