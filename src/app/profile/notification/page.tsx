import ProfileTabs from '@/components/Profile/ProfileTabs/ProfileTabs'
import NotificationPage from '@/components/Profile/UserNotification/NotificationPage';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Уведомления",
};

const notification = () => {
  return (
    <div>
      <ProfileTabs/>
      <NotificationPage/>
    </div>
  )
}

export default notification