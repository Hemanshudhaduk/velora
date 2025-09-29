"use client";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import styled from "styled-components";
import { CustomLink } from "../atoms";

export const ArticleCardStyle = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  boxShadow: "none",
  border: "1px solid #E4E4E7",
  borderRadius: "0.75rem",
  transition: "all 0.3s ease-in",
  cursor: "pointer",
}));

export const OverflowStyle = styled(Typography)(({ datalines }) => ({
  overflow: "hidden",
  display: "-webkit-box",
  lineClamp: datalines,
  WebkitLineClamp: datalines,
  WebkitBoxOrient: "vertical",
}));

export const ArticleDetailsStyle = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  // height: "100%", // Facing few issue due to this line keep it for now
  transition: "all 0.3s ease-in",
  boxShadow: "none !important",
  marginTop: "48px",
  maxWidth: "786px",
  marginLeft: "auto",
  marginRight: "auto",
  whiteSpace: "pre-wrap",
}));

export const ArticleDetailsContainer = styled(Box)(() => ({
  marginTop: "60px",
  paddingTop: "60px",
  marginBottom: "100px",
}));

export const ArticleDetailContentStyle = styled("div")(() => ({
  maxWidth: "786px",
  marginLeft: "auto",
  marginRight: "auto",
  whiteSpace: "pre-wrap",
}));

export const AuthorsLinksInner = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "auto auto",
  gap: "5px",
}));

export const ArticlesColumnFull = styled(CardContent)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
}));

export const CardInnerColumn = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  boxShadow: "none",
  border: "1px solid #E4E4E7",
  borderRadius: "0.75rem",
}));

export const ContainerCenterEnd = styled(Grid)(() => ({
  alignItems: "center",
  display: "flex",
  justifyContent: "flex-end",
}));

export const LinkEndColoured = styled(CustomLink)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  color: "#51525C !important",
}));
