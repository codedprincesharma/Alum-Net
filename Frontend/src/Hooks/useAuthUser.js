import { useQuery } from "@tanstack/react-query";
import { fetchAuthUser } from "../lib/api";

const useAuthUser = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["authUser"],
    queryFn: fetchAuthUser,
    retry: false,        // don’t retry if unauthenticated
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  return { authUser: data, isLoading, isError };
};

export default useAuthUser;
