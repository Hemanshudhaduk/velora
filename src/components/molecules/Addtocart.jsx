"use client";
import palette from "@/src/utils/theme/palette";
import { Close, ShoppingBag, Add, Remove, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Typography,
  Badge,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";

// Cart Item Component
const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      onQuantityChange(item.id, newQuantity);
    }
  };

  const discountPercentage = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);

  return (
    <Card sx={{ mb: 2, boxShadow: 1 }}>
      <Box display="flex" p={2}>
        {/* Product Image */}
        <CardMedia
          component="img"
          sx={{ width: 80, height: 100, objectFit: 'cover', borderRadius: 1 }}
          image={item.image}
          alt={item.name}
        />
        
        {/* Product Details */}
        <CardContent sx={{ flex: 1, p: 0, pl: 2, '&:last-child': { pb: 0 } }}>
          <Typography variant="body1" sx={{ fontWeight: 500, mb: 0.5 }}>
            {item.name}
          </Typography>
          
          {/* Price Section */}
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              ₹{item.originalPrice}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>
              ₹{item.price}
            </Typography>
            <Typography variant="body2" color="error" sx={{ fontWeight: 500 }}>
              {discountPercentage}% off
            </Typography>
          </Box>
          
          {/* Size */}
          <Typography variant="body2" color="text.secondary" mb={1}>
            Size: {item.size}
          </Typography>
          
          {/* Quantity Controls */}
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton 
                size="small" 
                onClick={() => handleQuantityChange(item.quantity - 1)}
                sx={{ border: '1px solid #ddd', width: 32, height: 32 }}
              >
                <Remove fontSize="small" />
              </IconButton>
              
              <Typography variant="body1" sx={{ minWidth: 20, textAlign: 'center' }}>
                {item.quantity}
              </Typography>
              
              <IconButton 
                size="small" 
                onClick={() => handleQuantityChange(item.quantity + 1)}
                sx={{ border: '1px solid #ddd', width: 32, height: 32 }}
              >
                <Add fontSize="small" />
              </IconButton>
            </Box>
            
            {/* Remove Button */}
            <IconButton 
              onClick={() => onRemove(item.id)}
              sx={{ color: 'text.secondary' }}
            >
              <Delete />
            </IconButton>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

const Addtocart = props => {
  const { handleCloseDrawerToggle, iconFirst, cartItems = [], onQuantityChange, onRemoveItem } = props;
  const t = useTranslations();
  const [showDrawer, setShowDrawer] = useState(false);

  const handleDrawerToggle = () => {
    setShowDrawer(!showDrawer);
  };

  const closeMenuDrawer = () => {
    setShowDrawer(false);
    if (iconFirst) handleCloseDrawerToggle();
  };

  // Calculate totals
  const totalMRP = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Button variant="text" disableRipple={true} onClick={() => handleDrawerToggle()}>
        <Badge 
          badgeContent={totalItems > 0 ? totalItems : null} 
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
          <ShoppingBag />
        </Badge>
      </Button>
      
      <Drawer
        open={showDrawer}
        anchor="right"
        PaperProps={{ sx: { width: "100%", maxWidth: { sm: "383px" }, paddingBottom: "1rem" } }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between" gap={1} padding={2}>
          <Typography variant="h6">{t("Cart")}</Typography>
          <IconButton onClick={closeMenuDrawer} sx={{ padding: "0" }}>
            <Close sx={{ fontSize: "2rem", color: palette.text.primary }} />
          </IconButton>
        </Box>
        <Divider color={palette.divider.divider} />
        
        {/* Cart Items */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={onQuantityChange}
                onRemove={onRemoveItem}
              />
            ))
          ) : (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="text.secondary">
                Your cart is empty
              </Typography>
            </Box>
          )}
        </Box>
        
        {/* Order Summary */}
        {cartItems.length > 0 && (
          <>
            <Divider />
            <Box p={2}>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">TOTAL MRP</Typography>
                <Typography variant="body2">₹{totalMRP}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>SUBTOTAL</Typography>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>₹{subtotal}</Typography>
              </Box>
              
              <Button 
                fullWidth 
                variant="contained" 
                sx={{ 
                  bgcolor: '#8e24aa', 
                  '&:hover': { bgcolor: '#7b1fa2' },
                  py: 1.5,
                  fontSize: '16px',
                  fontWeight: 600
                }}
              >
                PLACE ORDER
              </Button>
            </Box>
          </>
        )}
      </Drawer>
    </>
  );
};

export default Addtocart;