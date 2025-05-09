import { User } from "@supabase/auth-helpers-nextjs";
import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

import { UserDetails } from "../types";

type UserContextType = {
  access_token: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propsName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const access_token = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const getUserDetails = supabase.from("user").select("*").single();
  const getSubscription = supabase
    .from("subscriptions")
    .select("*, prices(*, products())")
    .in("status", ["trailing", "active"])
    .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails) {
      setIsLoadingData(true);
      Promise.allSettled([getUserDetails, getSubscription]).then((results) => {
        const userDetailsPromise = results[0];
        const subscriptionPromise = results[1];

        if (userDetailsPromise.status === "fulfilled") {
          setUserDetails(userDetailsPromise.value.data as UserDetails);
        }

        setIsLoadingData(false);
      });
    } else if (!user && !isLoadingUser && !isLoadingData) {
      setUserDetails(null);
    }
  }, [user, isLoadingUser]);

  const value = {
    access_token,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a MyContextUserProvider");
  }

  return context;
};
