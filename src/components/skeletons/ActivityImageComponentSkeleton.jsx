"use client";
import { Box, Grid, Skeleton, styled } from "@mui/material";

export const ActivityImageComponentStyle = styled(Box)({
  position: "relative",

  "& img": {
    cursor: "pointer",
  },

  "& .cm-main-img": {
    height: "100%",
    borderRadius: "8px 0 0 8px",
    overflow: "hidden",
  },

  "& .cm-img-list": {
    margin: 0,
    padding: 0,
    listStyleType: "none",
    display: "flex",
    alignItems: "stretch",
    flexWrap: "wrap",
    gap: "0.5rem",
    height: "100%",
    borderRadius: "0 8px 8px 0",
    overflow: "hidden",

    "& li": {
      maxHeight: "calc(50% - 4px)",
      width: "100%",
      maxWidth: "calc(50% - 4px)",
      height: "100%",
    },
  },

  "& .cm-more-btn": {
    position: "absolute",
    right: "1.5rem",
    bottom: "1rem",
  },
});

const ActivityImageComponentSkeleton = props => {
  return (
    <ActivityImageComponentStyle>
      <Grid container spacing={1} alignItems="stretch">
        <Grid item xs={12} sm={6} sx={{ maxHeight: "339px" }}>
          <div className="cm-main-img">
            <Skeleton variant="rectangular" width="100%" height="339px" />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ maxHeight: "339px" }}>
          <ul className="cm-img-list">
            <li>
              <Skeleton variant="rectangular" width="100%" height="100%" bgcolor="lightgray" />
            </li>
            <li>
              <Skeleton variant="rectangular" width="100%" height="100%" bgcolor="lightgray" />
            </li>
            <li>
              <Skeleton variant="rectangular" width="100%" height="100%" bgcolor="lightgray" />
            </li>
            <li>
              <Skeleton variant="rectangular" width="100%" height="100%" bgcolor="lightgray" />
            </li>
          </ul>
        </Grid>
      </Grid>
      <Skeleton className="cm-more-btn" variant="rectangular" height={50} width={120} />
    </ActivityImageComponentStyle>
  );
};
export default ActivityImageComponentSkeleton;
