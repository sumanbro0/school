import { client } from "@/lib/hono"
import { VideoGalleryType,InsertVideoGalleryType } from "@/types/contents/home"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export const useGetVideos=()=>{
    return useQuery({
        queryKey:["videos"],
        queryFn: async () => {
            const res = await client.api.home["video-gallery"].$get()
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        }
    })
}

export const useUpdateVideo=()=>{
        const queryClient = useQueryClient()

    return useMutation<{ message: string }, Error, VideoGalleryType>({
        mutationFn: async (data: VideoGalleryType) => {
            const res = await client.api.home["video-gallery"].$put({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey:["videos"]})
            }
    })
}

export const useCreateVideo=()=>{
        const queryClient = useQueryClient()

    return useMutation<{ message: string }, Error, InsertVideoGalleryType>({
        mutationFn: async (data: InsertVideoGalleryType) => {
            const res = await client.api.home["video-gallery"].$post({json:data})
            if (!res.ok) {
                throw new Error("An error occurred")
            }

            return res.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:["videos"]})
        }
    })
}