import ProfileTabs from '@/components/Profile/ProfileTabs/ProfileTabs'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Уведомления",
};

const notification = () => {
  return (
    <div><ProfileTabs/></div>
  )
}

export default notification