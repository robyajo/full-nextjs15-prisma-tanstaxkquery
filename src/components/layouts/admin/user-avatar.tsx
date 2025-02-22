import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function UserAvatar({ user }: any) {
  return (
    <Avatar className="h-8 w-8 rounded-lg">
      {user.image ? (
        <AvatarImage src={user.image} alt={user.name} className="rounded-lg" />
      ) : (
        <AvatarFallback className="rounded-lg">{user.name[0]}</AvatarFallback>
      )}
    </Avatar>
  );
}
