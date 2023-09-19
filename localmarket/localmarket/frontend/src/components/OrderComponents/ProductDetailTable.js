import React from 'react'
import { 
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper
} from '@mui/material'

const ProductDetailTable = ({order}) => {

    
  return (
    <TableContainer>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>SI.No</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Orginal Price</TableCell>
                    <TableCell>Discount</TableCell>
                    <TableCell>Discount Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
      {order.order_products.map((row, index) => {
        const productName = row.product_details.product_name;
        const variant = Object.keys(row.product_details.Product_variant)[0];
        const variantData = row.product_details.Product_variant[variant];
        return (
          <TableRow
            key={index + 1}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell>{productName}</TableCell>
            <TableCell>1</TableCell>
            <TableCell>{variant}</TableCell>
            <TableCell>{variantData.og_price}</TableCell>
            <TableCell>{variantData.discount}%</TableCell>
            <TableCell>{variantData.ds_price}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
        </Table>
    </TableContainer>
  )
}

export default ProductDetailTable