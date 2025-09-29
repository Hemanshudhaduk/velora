import { Skeleton as MuiSkeleton } from "@mui/material";

export default function CustomLoader(props) {
  const { animation, variant, width, height, ...otherProps } = props;
  return <MuiSkeleton animation={animation} variant={variant} width={width} height={height} {...otherProps} />;
}
