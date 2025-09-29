"use client";

import palette from "@/src/utils/theme/palette";
import { Chip, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState } from "react";

const ViewMore = dynamic(() => import("../molecules/ViewMoreComponent"));

const ActivitySymptomList = props => {
  const { symptomList } = props;
  const [symptomView, setSymptomView] = useState(symptomList?.slice(0, 15));
  const t = useTranslations();
  const getSymptomCount = async pageSize => {
    setSymptomView(symptomList?.slice(0, pageSize));
  };

  return (
    <>
      {symptomView &&
        symptomView.map(symptom => {
          return <Chip key={symptom.unqGUID} label={symptom.symptomName} />;
        })}
      {symptomView?.length < symptomList?.length ? (
        <ViewMore
          title={
            <Typography variant="body2" fontWeight={600} color={palette.text.secondary} textAlign="center">
              {t("viewMore")}
            </Typography>
          }
          defaultPageSize={15}
          pageSize={15}
          clickHandler={getSymptomCount}
        />
      ) : null}
    </>
  );
};

export default ActivitySymptomList;
