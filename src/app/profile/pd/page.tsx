import ProfileTabs from '@/components/Profile/ProfileTabs/ProfileTabs';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Профиль пользователя",
};

const page = () => {
  return (
    <div>
      <ProfileTabs />
    </div>
  );
}

export default page