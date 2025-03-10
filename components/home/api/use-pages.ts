import { client } from "@/lib/hono"
import {PageType,InsertPageType } from "@/types/contents/home"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"


export const useGetPages=()=>{
    return useQuery({
        queryKey:["page"],
        queryFn: async () => {
            const res = await client.api.page.$get()
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        }
    })
}
export const useGetPage=(id:string)=>{
    return useQuery({
        queryKey:["page",id],
        queryFn: async () => {
            const res = await client.api.page.edit[":id"].$get({
                param:{
                    id:id.toString()
                }
            })
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
        enabled:!!id
    })
}


export const useUpdatePages=()=>{
        const queryClient = useQueryClient()

    return useMutation<{ message: string }, Error, PageType>({
        mutationFn: async (data: PageType) => {
            const res = await client.api.page.$put({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
            onSuccess: ({},{id}) => {
                queryClient.invalidateQueries({queryKey:["page",id]})
                queryClient.invalidateQueries({queryKey:["page"]})
            }
    })
}

export const useCreatePages=()=>{
        const queryClient = useQueryClient()

    return useMutation<{ message: string }, Error, InsertPageType>({
        mutationFn: async (data: InsertPageType) => {
            const res = await client.api.page.$post({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
         onSuccess: () => {
                queryClient.invalidateQueries({queryKey:["page"]})
            }
    })
}
