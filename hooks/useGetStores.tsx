import { useQuery } from "react-query";

import fetcher from "@/libs/fetcher";
// Replace with the correct path to your reactQueryClient.js file

const useGetStores = () => {
  const { data, error, isError, isLoading,refetch } = useQuery(
    "Stores",
    () => fetcher(`/api/stores`)
  );

  return {
    data,
    error,
    isLoading,
    refetch,
    isError,
  };
};

export default useGetStores;