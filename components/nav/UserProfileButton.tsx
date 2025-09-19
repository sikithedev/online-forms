"use client";

import { UserButton, useUser } from "@clerk/nextjs";

function UserProfileButtonSkeleton() {
  return <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse" />;
}

export default function UserProfileButton() {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <UserProfileButtonSkeleton />;
  }

  if (!isSignedIn) {
    return null;
  }

  return <UserButton fallback={<UserProfileButtonSkeleton />} />;
}
