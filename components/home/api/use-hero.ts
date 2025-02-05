import { client } from "@/lib/hono"
import { HeroType, InsertHeroType } from "@/types/contents/home"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useGetHero=()=>{
    return useQuery({
        queryKey:["hero"],
        queryFn: async () => {
            const res = await client.api.home.hero.$get()
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        }
    })
}

export const useUpdateHero=()=>{
    const queryClient = useQueryClient()
    return useMutation<{ message: string }, Error, HeroType>({
        mutationFn: async (data: HeroType) => {
            const res = await client.api.home.hero.$put({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
          onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["hero"]})
        }
        
    },)
}

export const useCreateHero=()=>{
    const queryClient = useQueryClient()
    return useMutation<{ message: string }, Error, InsertHeroType>({
        mutationFn: async (data: InsertHeroType) => {
            const res = await client.api.home.hero.$post({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["hero"]})
        }
    })
}