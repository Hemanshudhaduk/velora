import { Link } from "@mui/material";

function LinkWithOnclick(props) {
  const { title, handleClick } = props;
  return (
    <>
      <Link onClick={handleClick} style={{ cursor: "pointer", textDecoration: "none" }}>
        {title}
      </Link>
    </>
  );
}

export default LinkWithOnclick;
