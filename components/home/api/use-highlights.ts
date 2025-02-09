import { client } from "@/lib/hono"
import { HighlightType,InsertHighlightType } from "@/types/contents/home"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useGetHighlight=()=>{
    return useQuery({
        queryKey:["highlights"],
        queryFn: async () => {
            const res = await client.api.home.highlights.$get()
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        }
    })
}

export const useUpdateHighlight=()=>{
        const queryClient = useQueryClient()

    return useMutation<{ message: string }, Error, HighlightType>({
        mutationFn: async (data: HighlightType) => {
            const res = await client.api.home.highlight.$put({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey:["highlights"]})
            }
    })
}

export const useCreateHighlight=()=>{
        const queryClient = useQueryClient()

    return useMutation<{ message: string }, Error, InsertHighlightType>({
        mutationFn: async (data: InsertHighlightType) => {
            const res = await client.api.home.highlight.$post({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["highlights"]})
        }
    })
}