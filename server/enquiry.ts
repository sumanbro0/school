import { client } from "@/lib/hono"
import { InsertEnquery } from "@/types/enquery"
import {  useMutation, useQuery } from "@tanstack/react-query"

export const useCreateEnquiry = () => {
    return useMutation({
        mutationFn:async (values:InsertEnquery) => {
            const res=await client.api.enquiry.$post({json:values})
            if (!res.ok) {
                throw new Error('An error occurred')
            }
            return res.json()
    },
    onSuccess:()=>{
        //invalidate queries
    }
})
}
export const useGetEnquiries = (page: number) => {
  console.log(page)
  return useQuery({
    queryKey: ['enquiries', page],
    queryFn: async () => {
      const res = await client.api.enquiry.$get({ 
        param: { page: page.toString() } 
      });
      if (!res.ok) {
        throw new Error('An error occurred');
      }
      return res.json();
    },
    enabled: page > 0,
  });
};