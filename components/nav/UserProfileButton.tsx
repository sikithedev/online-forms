import { UserButton } from "@clerk/nextjs";

function UserProfileButtonSkeleton() {
  return <div className="w-7 h-7 rounded-full bg-gray-200 animate-pulse" />;
}

export default function UserProfileButton() {
  return <UserButton fallback={<UserProfileButtonSkeleton />} />;
}
