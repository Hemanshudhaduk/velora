"use client";

import { ActivityDefaultValues } from "@/src/constants";
import { generateURLFromPayload } from "@/src/utils";
import { Button, Chip, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ActivityTypeRadio = params => {
  const t = useTranslations();
  const router = useRouter();
  const [filterColumns, setFilterColumns] = useState({ ...params.configuration.filterColumns });
  const setActivityTypeChange = value => {
    setFilterColumns({ ...filterColumns, activityType: value });
  };
  return (
    <Button
      variant="outlined"
      color="inherit"
      disableRipple
      sx={{
        paddingTop: { xs: "0px", sm: "3px" },
        paddingBottom: { xs: "0px", sm: "3px" },
        paddingLeft: { xs: "0px", sm: "15px" },
        fontSize: { xs: "14px", sm: "16px" },
      }}
    >
      <RadioGroup
        row
        sx={{ flexWrap: "nowrap", gap: "0" }}
        value={filterColumns.activityType}
        onChange={(e, value) => {
          const payload = params.configuration;
          payload.pageNumber = 0;
          payload.filterColumns.activityType = value;
          if (value === ActivityDefaultValues.filterColumns.virtualActivityType) {
            payload.filterColumns.city = [];
          }
          router.replace(`activity?${generateURLFromPayload(payload)}`, { shallow: true });
          setActivityTypeChange(value);
        }}
      >
        <FormControlLabel
          key={"In-Person"}
          value={"In-Person"}
          control={<Radio />}
          label={
            <Chip
              label={t("in-person")}
              color={
                filterColumns.activityType === ActivityDefaultValues.filterColumns.activityType ? "primary" : "default"
              }
            />
          }
        />
        <FormControlLabel
          key={"OnlineCall"}
          value={"OnlineCall"}
          control={<Radio />}
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
    </Button>
  );
};

export default ActivityTypeRadio;
