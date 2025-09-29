import palette from "@/src/utils/theme/palette";
import { CheckCircleOutline } from "@mui/icons-material";
import { ListItem, ListItemIcon, ListItemText } from "@mui/material";

function CustomListItem({ title }) {
  return (
    <ListItem disablePadding>
      <ListItemIcon>
        <CheckCircleOutline color="success" />
      </ListItemIcon>
      <ListItemText
        primary={title}
        primaryTypographyProps={{
          color: palette.text.secondary,
        }}
      />
    </ListItem>
  );
}

export default CustomListItem;
