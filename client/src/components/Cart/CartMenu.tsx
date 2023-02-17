// @mui
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import PropTypes from 'prop-types'
import {
  Badge,
  Drawer,
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import styled from '@emotion/styled'
import {
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart,
} from '../../features/cart/cartSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

type CartMenuProps = {
  openCart?: boolean
  onOpenCart?: () => void
  onCloseCart?: () => void
}

CartMenu.propTypes = {
  openCart: PropTypes.bool,
  onOpenCart: PropTypes.func,
  onCloseCart: PropTypes.func,
}

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export default function CartMenu({
  openCart,
  onOpenCart,
  onCloseCart,
}: CartMenuProps) {
  const cartQuantity = useAppSelector((state) => state.cart.cartTotalQuantity)

  const cartItems = useAppSelector((state) => state.cart.cartItems)

  const handleRemoveFromCart = (item: {
    _id: string
    name: string
    price: number
    description: string
    image: string
    cartQuantity: number
  }) => {
    dispatch(removeFromCart(item))
  }

  console.log(cartItems)
  const dispatch = useAppDispatch()
  return (
    <>
      <Badge
        showZero
        badgeContent={cartQuantity}
        color="error"
        max={5}
        onClick={onOpenCart}
        // invisible={cartQuantity === 0}
        sx={{
          '& .MuiBadge-badge': {
            right: 5,
            top: 5,
            minWidth: '13px',
          },
        }}
      >
        <IconButton sx={{ color: '#127FFF' }}>
          <ShoppingCart />
        </IconButton>
      </Badge>

      <Drawer
        anchor="right"
        open={openCart}
        onClose={onCloseCart}
        PaperProps={{
          sx: { width: 350, border: 'none', overflow: 'hidden' },
        }}
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography>SHOPPING BAG ({cartItems.length})</Typography>
          </FlexBox>
          <Divider variant="fullWidth" />
          {/* CART LIST */}
          <Box>
            {cartItems?.map((item) => (
              <Box key={item._id}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      alt={item?.name}
                      width="123px"
                      height="164px"
                      src={item.image}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">{item.name}</Typography>
                      <IconButton onClick={() => handleRemoveFromCart(item)}>
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item.description}</Typography>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={'1.5px solid black'}
                      >
                        <IconButton
                        //   onClick={() =>
                        //     dispatch(decreaseCount({ id: item.id }))
                        //   }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{item.cartQuantity}</Typography>
                        <IconButton
                        //   onClick={() =>
                        //     dispatch(increaseCount({ id: item.id }))
                        //   }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography fontWeight="bold">${item.price}</Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  )
}
