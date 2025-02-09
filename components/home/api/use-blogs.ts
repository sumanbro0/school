import { client } from "@/lib/hono"
import { BlogType,InsertBlogType, InsertCategoryType } from "@/types/contents/home"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useGetCategories=()=>{
    return useQuery({
        queryKey:["categories"],
        queryFn: async () => {
            const res = await client.api.blogs["categories"].$get()
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        }
    })
}
export const useGetBlogs=()=>{
    return useQuery({
        queryKey:["blog"],
        queryFn: async () => {
            const res = await client.api.blogs.$get({
                query:{
                    type:"blog"
                }
            })
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        }
    })
}
export const useGetActivities=()=>{
    return useQuery({
        queryKey:["activity"],
        queryFn: async () => {
            const res = await client.api.blogs.$get({
                query:{
                    type:"activity"
                }
            })
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        }
    })
}

export const useUpdateBlogs=()=>{
        const queryClient = useQueryClient()

    return useMutation<{ message: string }, Error, BlogType>({
        mutationFn: async (data: BlogType) => {
            const res = await client.api.blogs.$put({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
            onSuccess: ({},{contentTypeEnum}) => {
                queryClient.invalidateQueries({queryKey:[contentTypeEnum]})
            }
    })
}

export const useCreateBlogs=()=>{
        const queryClient = useQueryClient()

    return useMutation<{ message: string }, Error, InsertBlogType>({
        mutationFn: async (data: InsertBlogType) => {
            const res = await client.api.blogs.$post({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
         onSuccess: ({},{contentTypeEnum}) => {
                queryClient.invalidateQueries({queryKey:[contentTypeEnum]})
            }
    })
}

export const useCreateCategories=()=>{
        const queryClient = useQueryClient()

    return useMutation<{ message: string }, Error, InsertCategoryType>({
        mutationFn: async (data: InsertCategoryType) => {
            const res = await client.api.blogs["categories"].$post({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["categories"]})
        }
    })
}