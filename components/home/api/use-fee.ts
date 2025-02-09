import { client } from "@/lib/hono"
import { HeroType, InsertFeeStructureWithFees, SelectFeeStructureWithFees } from "@/types/contents/home"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useGetFees=()=>{
    return useQuery({
        queryKey:["fees"],
        queryFn: async () => {
            const res = await client.api.fees.$get()
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
        select: (data) => ({data:data.feeStructures})
    })
}

export const useUpdateFee=()=>{
    const queryClient = useQueryClient()
    return useMutation<{ message: string }, Error, InsertFeeStructureWithFees>({
        mutationFn: async (data: InsertFeeStructureWithFees) => {
            const res = await client.api.fees.$put({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
          onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["fees"]})
        }
        
    },)
}

export const useCreateFee=()=>{
    const queryClient = useQueryClient()
    return useMutation<{ message: string }, Error, InsertFeeStructureWithFees>({
        mutationFn: async (data: InsertFeeStructureWithFees) => {
            const res = await client.api.fees.$post({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["fees"]})
        }
    })
}