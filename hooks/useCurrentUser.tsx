import { useQuery } from "react-query";
 
import fetcher from "@/libs/fetcher";
   // Replace with the correct path to your reactQueryClient.js file

const usecurrentUser = () => {
  const { data, error, isLoading } = useQuery("currentUser",()=> fetcher('/api/current'));

  return {
    data,
    error,
    isLoading,
  };
};

export default usecurrentUser;