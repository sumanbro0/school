import { client } from "@/lib/hono"
import { insertAdmission as InsertAdmission } from "@/types/school"
import {  useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCreateRegistration = () => {
  const queryClient = useQueryClient()
    return useMutation({
        mutationFn:async (values:InsertAdmission) => {
            const res=await client.api.registration.$post({json:values})
            if (!res.ok) {
                throw new Error('An error occurred')
            }
            return res.json()
    },
    onSuccess:()=>{
        queryClient.invalidateQueries({queryKey:['registrations']})
    }
})
}

export const useGetRegistrations = ({page}:{page: number}) => {
  const currentPage = Number(page);

  return useQuery({
    queryKey: ['registrations', page],
    queryFn: async () => {
      const res = await client.api.registration.$get({ 
        query: { page: currentPage.toString() } 
      });
      if (!res.ok) {
        throw new Error('An error occurred');
      }
      return res.json();
    },
    enabled: page > 0,
   

  });
};


export const useInfiniteRegistrations = () => {
  return useInfiniteQuery({
    queryKey: ['registrations-infinite'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await client.api.registration.$get({ 
        query: { page: pageParam.toString() } 
      });
      if (!res.ok) {
        throw new Error('An error occurred');
      }
      const data = await res.json();
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Assuming your API returns a hasMore flag or total pages info
      // Return undefined when there are no more pages to load
      if (lastPage.hasNextPage === false) return undefined;
      return allPages.length + 1;
    },
  });
};