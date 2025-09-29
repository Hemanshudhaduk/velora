import { Typography } from "@mui/material";

function ActivityList(props) {
  const { pageName } = props;
  return (
    <div>
      <Typography component={"h3"} variant="h3">
        Welcome to Activity List page {pageName}
      </Typography>
    </div>
  );
}

export default ActivityList;
