import React from 'react'
import { 
  Container, 
  Typography
} from '@mui/material'
import DeliveryTabs from './DeliveryTabs';

let Orders = [
  {
    order_id: 1,
    customer_name: 'Customer 1',
    customer_address: {
      add_line_1: 'Test address line 1',
      add_line_2: 'Test address line 2',
      street_address: 'Test street address',
      city: 'Test city',
      zip_code: 87656,
    },
    customer_phone: 9867456765,
    delivery_status: 'pending',
    order_products: [
      {
        product_details: {
          product_name: 'Capsicum',

          Product_variant: {
            '500 g': {
              og_price: 100,
              discount: 20,
              ds_price: 80,
            },
          },
        },
      },
      {
        product_details: {
          product_name: 'Pears',
          Product_variant: {
            '125 g': {
              og_price: 58,
              discount: 20,
              ds_price: 47,
            },
          },
        },
      },
      {
        product_details: {
          product_name: 'Horlicks',
          Product_variant: {
            '250 g': {
              og_price: 210,
              discount: 15,
              ds_price: 179,
            },
          },
        },
      },
    ],
  },
  {
    order_id: 2,
    customer_name: 'Customer 2',
    customer_address: {
      add_line_1: 'Test address line 1',
      add_line_2: 'Test address line 2',
      street_address: 'Test street address',
      city: 'Test city',
      zip_code: 76543,
    },
    customer_phone: 9876543210,
    delivery_status: 'pending',
    order_products: [
      {
        product_details: {
          product_name: 'Bananas',
          Product_variant: {
            '1 dozen': {
              og_price: 120,
              discount: 10,
              ds_price: 108,
            },
          },
        },
      },
      {
        product_details: {
          product_name: 'Apples',
          Product_variant: {
            '5 kg': {
              og_price: 250,
              discount: 20,
              ds_price: 200,
            },
          },
        },
      },
    ],
  },
  {
    order_id: 3,
    customer_name: 'Customer 3',
    customer_address: {
      add_line_1: 'Test address line 1',
      add_line_2: 'Test address line 2',
      street_address: 'Test street address',
      city: 'Test city',
      zip_code: 54321,
    },
    customer_phone: 9876123450,
    delivery_status: 'delivered',
    order_products: [
      {
        product_details: {
          product_name: 'Tomatoes',
          Product_variant: {
            '1 kg': {
              og_price: 80,
              discount: 15,
              ds_price: 68,
            },
          },
        },
      },
      {
        product_details: {
          product_name: 'Milk',
          Product_variant: {
            '1 liter': {
              og_price: 50,
              discount: 5,
              ds_price: 47.5,
            },
          },
        },
      },
    ],
  },
  {
    order_id: 4,
    customer_name: 'Customer 4',
    customer_address: {
      add_line_1: 'Test address line 1',
      add_line_2: 'Test address line 2',
      street_address: 'Test street address',
      city: 'Test city',
      zip_code: 65432,
    },
    customer_phone: 9876540987,
    delivery_status: 'pending',
    order_products: [
      {
        product_details: {
          product_name: 'Potatoes',
          Product_variant: {
            '2 kg': {
              og_price: 90,
              discount: 10,
              ds_price: 81,
            },
          },
        },
      },
      {
        product_details: {
          product_name: 'Bread',
          Product_variant: {
            '1 loaf': {
              og_price: 30,
              discount: 5,
              ds_price: 28.5,
            },
          },
        },
      },
    ],
  },
  {
    order_id: 5,
    customer_name: 'Customer 5',
    customer_address: {
      add_line_1: 'Test address line 1',
      add_line_2: 'Test address line 2',
      street_address: 'Test street address',
      city: 'Test city',
      zip_code: 76543,
    },
    customer_phone: 9876543210,
    delivery_status: 'delivered',
    order_products: [
      {
        product_details: {
          product_name: 'Oranges',
          Product_variant: {
            '1 dozen': {
              og_price: 80,
              discount: 10,
              ds_price: 72,
            },
          },
        },
      },
      {
        product_details: {
          product_name: 'Eggs',
          Product_variant: {
            '1 dozen': {
              og_price: 36,
              discount: 5,
              ds_price: 34.2,
            },
          },
        },
      },
    ],
  },
  {
    order_id: 6,
    customer_name: 'Customer 6',
    customer_address: {
      add_line_1: 'Test address line 1',
      add_line_2: 'Test address line 2',
      street_address: 'Test street address',
      city: 'Test city',
      zip_code: 87654,
    },
    customer_phone: 9876545678,
    delivery_status: 'delivered',
    order_products: [
      {
        product_details: {
          product_name: 'Onions',
          Product_variant: {
            '1 kg': {
              og_price: 50,
              discount: 10,
              ds_price: 45,
            },
          },
        },
      },
      {
        product_details: {
          product_name: 'Cheese',
          Product_variant: {
            '250 g': {
              og_price: 120,
              discount: 15,
              ds_price: 102,
            },
          },
        },
      },
    ],
  },
  {
    order_id: 7,
    customer_name: 'Customer 7',
    customer_address: {
      add_line_1: 'Test address line 1',
      add_line_2: 'Test address line 2',
      street_address: 'Test street address',
      city: 'Test city',
      zip_code: 98765,
    },
    customer_phone: 9876534567,
    delivery_status: 'pending',
    order_products: [
      {
        product_details: {
          product_name: 'Cucumbers',
          Product_variant: {
            '500 g': {
              og_price: 60,
              discount: 10,
              ds_price: 54,
            },
          },
        },
      },
      {
        product_details: {
          product_name: 'Yogurt',
          Product_variant: {
            '500 ml': {
              og_price: 40,
              discount: 5,
              ds_price: 38,
            },
          },
        },
      },
    ],
  },
];

const Delivery = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '30px', marginBottom: '30px'}}>
      <Typography variant="h4"  style={{ marginBottom: '20px', fontWeight: 'bold', textAlign:'center'}}>
        Delivery Details
      </Typography> 
      <DeliveryTabs orders={Orders}/>
    </Container>
  )
}

export default Delivery