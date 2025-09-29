"use client";
import palette from "@/src/utils/theme/palette";
import { Close, Favorite } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
  Badge,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

const LikeProduct = props => {
  const { handleCloseDrawerToggle, iconFirst, likedItemCount = 0 } = props;
  const t = useTranslations();
  const [showDrawer, setShowDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setShowDrawer(!showDrawer);
  };

  const closeMenuDrawer = () => {
    setShowDrawer(false);
    if (iconFirst) handleCloseDrawerToggle();
  };

  return (
    <>
      <Button variant="text" disableRipple={true} onClick={() => handleDrawerToggle()}>
        <Badge 
          badgeContent={likedItemCount > 0 ? likedItemCount : null} 
          color="error"
          sx={{
            '& .MuiBadge-badge': {
              right: -3,
              top: 3,
              border: '2px solid white',
              padding: '0 4px',
            },
          }}
        >
          <Favorite sx={{ color: likedItemCount > 0 ? '#e91e63' : 'inherit' }} />
        </Badge>
      </Button>
      <Drawer
        open={showDrawer}
        anchor="right"
        PaperProps={{ sx: { width: "100%", maxWidth: { sm: "383px" }, paddingBottom: "1rem" } }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} padding={2}>
          <Typography variant="h6">{t("wishlist")}</Typography>
          <IconButton onClick={closeMenuDrawer} sx={{ padding: "0" }}>
            <Close sx={{ fontSize: "2rem", color: palette.text.primary }} />
          </IconButton>
        </Box>
        <Divider color={palette.divider.divider} />
        
        {/* Wishlist content will go here */}
        <Box p={2}>
          <Typography variant="body1">
            {likedItemCount > 0 
              ? `You have ${likedItemCount} liked item${likedItemCount > 1 ? 's' : ''} in your wishlist`
              : 'Your wishlist is empty'
            }
          </Typography>
          
          {likedItemCount > 0 && (
            <Box mt={2}>
              <Typography variant="body2" color="text.secondary">
                💝 Items you've liked will appear here
              </Typography>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default LikeProduct;