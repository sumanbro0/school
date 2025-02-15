import { client } from "@/lib/hono"
import { PopupType, InsertPopupType } from "@/types/contents/home"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useGetPopup=()=>{
    return useQuery({
        queryKey:["popup"],
        queryFn: async () => {
            const res = await client.api.home.popup.$get()
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
        select: (data) => ({data:data.data})
    })
}

export const useUpdatePopup=()=>{
    const queryClient = useQueryClient()
    return useMutation<{ message: string }, Error, PopupType>({
        mutationFn: async (data: PopupType) => {
            const res = await client.api.home.popup.$put({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
          onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["popup"]})
        }
        
    },)
}

export const useCreatePopup=()=>{
    const queryClient = useQueryClient()
    return useMutation<{ message: string }, Error, InsertPopupType>({
        mutationFn: async (data: InsertPopupType) => {
            const res = await client.api.home.popup.$post({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["popup"]})
        }
    })
}