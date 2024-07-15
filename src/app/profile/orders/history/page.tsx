import OrdersHistory from '@/components/Profile/Orders/OrdersHistory';
import ProfileTabs from '@/components/Profile/ProfileTabs/ProfileTabs'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "История заказов",
};

const page = () => {
  return (
    <div><ProfileTabs/>
      <OrdersHistory/>
    </div>
  )
}

export default page