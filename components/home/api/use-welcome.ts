import { client } from "@/lib/hono"
import { WelcomeType,InsertWelcomeType } from "@/types/contents/home"
import { useQuery, useMutation } from "@tanstack/react-query"

export const useGetwelcome=()=>{
    return useQuery({
        queryKey:["welcome"],
        queryFn: async () => {
            const res = await client.api.home.welcome.$get()
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        }
    })
}

export const useUpdatewelcome=()=>{
    return useMutation<{ message: string }, Error, WelcomeType>({
        mutationFn: async (data: WelcomeType) => {
            const res = await client.api.home.welcome.$put({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        }
    })
}

export const useCreatewelcome=()=>{
    return useMutation<{ message: string }, Error, InsertWelcomeType>({
        mutationFn: async (data: InsertWelcomeType) => {
            const res = await client.api.home.welcome.$post({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        }
    })
}