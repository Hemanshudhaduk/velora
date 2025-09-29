import palette from "./palette";

const typography = {
  fontFamily: "'Inter', sans-serif",
  h1: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: "4.5rem",
    lineHeight: "5.625rem",
    "@media (max-width:767px)": {
      fontSize: "1.875rem",
      lineHeight: "2.375rem",
      fontWeight: 600,
    },
  },
  h2: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: "3.75rem",
    lineHeight: "4.5rem",
    "@media (max-width:767px)": {
      fontSize: "1.875rem",
      lineHeight: "2.375rem",
      fontWeight: 600,
    },
  },
  h3: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: "3rem",
    lineHeight: "3.75rem",
  },
  h4: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: "2.25rem",
    lineHeight: "2.75rem",
  },
  h5: {
    color: palette.text.primary,
    fontWeight: 600,
    fontSize: "1.875rem",
    lineHeight: "2.375rem",
  },
  h6: {
    color: palette.text.primary,
    fontWeight: 500,
    fontSize: "1.5rem",
    lineHeight: "2rem",
  },
  subtitle1: {
    color: palette.text.secondary,
    fontWeight: 400,
    fontSize: "1.25rem",
    lineHeight: "1.875rem",
  },
  subtitle2: {
    color: palette.text.secondary,
    fontWeight: 400,
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
  },
  body1: {
    color: palette.text.primary,
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
  body2: {
    color: palette.text.secondary,
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: "1.125rem",
  },
  caption: {
    color: palette.text.secondary,
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "1.125rem",
  },
};

export default typography;
