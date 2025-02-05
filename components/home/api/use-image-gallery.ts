import { client } from "@/lib/hono"
import {InsertImageGalleryType, ImageGalleryType } from "@/types/contents/home"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useGetImages=()=>{
    return useQuery({
        queryKey:["images"],
        queryFn: async () => {
            const res = await client.api.home["image-gallery"].$get()
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        }
    })
}

export const useUpdateImage=()=>{
        const queryClient = useQueryClient()

    return useMutation<{ message: string }, Error, ImageGalleryType>({
        mutationFn: async (data: ImageGalleryType) => {
            const res = await client.api.home["image-gallery"].$put({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey:["images"]})
            }
    })
}

export const useCreateImage=()=>{
        const queryClient = useQueryClient()

    return useMutation<{ message: string }, Error, InsertImageGalleryType>({
        mutationFn: async (data: InsertImageGalleryType) => {
            const res = await client.api.home["image-gallery"].$post({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["images"]})
        }
    })
}