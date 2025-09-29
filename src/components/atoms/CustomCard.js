import { Card, CardContent, Typography } from "@mui/material";
import { CustomImgStyle } from "../style";

const CustomCard = props => {
  const { title, src } = props;
  return (
    <Card>
      <CardContent>
        <CustomImgStyle src={src} alt="logo" />
        <Typography variant="subtitle1" fontWeight={500}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
