"use client";

import Header from "@/components/Header";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AccountContent = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  return (
    <div className="mb-7 px-6">
      <h1 className="text-white text-3xl font-semibold">In Progress...</h1>
    </div>
  );
};

export default AccountContent;
