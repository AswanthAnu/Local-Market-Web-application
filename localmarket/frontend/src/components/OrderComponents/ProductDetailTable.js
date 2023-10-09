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

const ProductDetailTable = ({orderItems}) => {

    
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
      {orderItems.map((row, index) => {
        return (
          <TableRow
            key={index + 1}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{index + 1}</TableCell>
            <TableCell>{row.product_name}</TableCell>
            <TableCell>{`${row.variant_weight} ${row.variant_weight_unit}`}</TableCell>
            <TableCell>{row.quantity}</TableCell>
            <TableCell>{row.original_price}</TableCell>
            <TableCell>{row.discount}%</TableCell>
            <TableCell>{row.discount_price}</TableCell>
          </TableRow>
        );
      })}
    </TableBody>
        </Table>
    </TableContainer>
  )
}

export default ProductDetailTable