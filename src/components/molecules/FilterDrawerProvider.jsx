"use client";
import { ProviderDefaultValues, specialCharacterRegex } from "@/src/constants";
import { generateURLFromPayload, generateURLFromPayloadProvider } from "@/src/utils";
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
import { useRouter } from "next/navigation";
import { useState } from "react";

const FilterDrawerProvider = params => {
  const t = useTranslations();
  const router = useRouter();

  const [drawerFilter, setDrawerFilter] = useState(false);

  const toggleFilter = () => {
    setFilterColumns({ ...params.configuration.filterColumns });
    setDrawerFilter(!drawerFilter);
  };
  const [filterColumns, setFilterColumns] = useState({ ...params.configuration.filterColumns });
  const filterLists = params.filterConfiguration;

  let filterCount = 0;
  filterCount =
    filterColumns.providerName !== ProviderDefaultValues.filterColumns.providerName ? filterCount + 1 : filterCount;
  filterCount =
    filterColumns.supportingType?.length !== ProviderDefaultValues.filterColumns.supportingType.length
      ? filterCount + 1
      : filterCount;
  filterCount =
    filterColumns.category?.length !== ProviderDefaultValues.filterColumns.category.length
      ? filterCount + 1
      : filterCount;
  filterCount =
    filterColumns.topic?.length !== ProviderDefaultValues.filterColumns.topic.length ? filterCount + 1 : filterCount;
  filterCount =
    filterColumns.city?.length !== ProviderDefaultValues.filterColumns.city.length ? filterCount + 1 : filterCount;
  filterCount =
    filterColumns.symptoms?.length !== ProviderDefaultValues.filterColumns.symptoms.length
      ? filterCount + 1
      : filterCount;
  filterCount =
    filterColumns.activityType?.length !== ProviderDefaultValues.filterColumns.activityType.length
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
      router.replace(`providers?${generateURLFromPayload(payload)}`, { shallow: true });
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
      router.replace(`providers?${generateURLFromPayload(payload)}`, { shallow: true });
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
      router.replace(`providers?${generateURLFromPayload(payload)}`, { shallow: true });
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
      router.replace(`providers?${generateURLFromPayload(payload)}`, { shallow: true });
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
      router.replace(`providers?${generateURLFromPayload(payload)}`, { shallow: true });
    }
  }

  return (
    <>
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
        {/* Title */}
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} padding={2}>
          <Typography variant="h6">{t("filter")}</Typography>
          <IconButton onClick={toggleFilter} sx={{ padding: "0" }}>
            <Close sx={{ fontSize: "2rem", color: palette.text.primary }} />
          </IconButton>
        </Box>
        <Divider color={palette.divider.divider} />

        <Box flex="1 1 0" sx={{ overflow: "auto" }}>
          {/* Company Name */}
          <Box py={3} px={2}>
            <Typography variant="body2" color={palette.text.primary} mb={1}>
              {t("providersList.companyName")}
            </Typography>
            <TextField
              value={filterColumns.providerName}
              onChange={e => {
                if (!specialCharacterRegex.test(e.target.value))
                  setFilterColumns({ ...filterColumns, providerName: e.target.value });
              }}
              type="text"
              placeholder={t("typeAName")}
            />
          </Box>
          <Divider color={palette.divider.divider} />

          {/* Supporting Type */}
          <Box py={3} px={2}>
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
          <Divider color={palette.divider.divider} />

          {/* Category */}
          <Box py={3} px={2}>
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
                  <Chip {...getTagProps({ index })} key={option.unqGUID} label={option.title} />
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
          <Divider color={palette.divider.divider} />

          {/* Topic */}
          <Box py={3} px={2}>
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
                  <Chip {...getTagProps({ index })} key={option.unqGUID} label={option.title} />
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
          <Divider color={palette.divider.divider} />

          {/* City */}
          <Box py={3} px={2}>
            <Typography color={palette.text.primary} variant="body2" mb={1}>
              {t("city")}
            </Typography>
            <Autocomplete
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
                  <Chip {...getTagProps({ index })} key={option.unqGUID} label={option.title} />
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
          <Divider color={palette.divider.divider} />

          {/* Activity Type */}
          <Box py={3} px={2}>
            <Typography variant="body2" color={palette.text.primary} mb={1}>
              {t("activityType")}
            </Typography>
            <Stack direction="row" spacing={1}>
              {[
                { title: t("in-person"), value: "In-Person" },
                { title: t("onlinecall"), value: "OnlineCall" },
              ].map(item => (
                <FormControlLabel
                  key={item}
                  value={item}
                  control={
                    <Chip
                      key={item.value}
                      value={item.value}
                      color={filterColumns.activityType.includes(item.value) ? "primary" : "default"}
                      label={item.title}
                      onClick={() => {
                        const activityType = [...filterColumns.activityType];
                        if (filterColumns.activityType.includes(item.value)) {
                          activityType.splice(filterColumns.activityType.indexOf(item.value), 1);
                          setFilterColumns({ ...filterColumns, activityType: activityType });
                        } else {
                          activityType.push(item.value);
                          setFilterColumns({ ...filterColumns, activityType: activityType });
                        }
                      }}
                    />
                  }
                />
              ))}
            </Stack>
          </Box>
          <Divider color={palette.divider.divider} />

          {/* Symptom */}
          <Box py={3} px={2}>
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

              router.replace(`providers?${generateURLFromPayloadProvider(payload)}`, { shallow: true });

              toggleFilter();
            }}
          >
            {t("save")}
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default FilterDrawerProvider;
