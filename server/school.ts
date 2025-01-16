import { client } from "@/lib/hono"
import { InsertSchool } from "@/types/school"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetSchool = () => {
    return useQuery({
        queryKey:["school"],
        queryFn:async ()=>{
            const res=await client.api.school.$get()
            if (!res.ok) throw new Error(res.statusText)
            return res.json()
        }
    })
}

export const useCreateSchool = () => {
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:async (data:InsertSchool)=>{
            const json=data.logo ?data :{...data,logo:"https://avatar.vercel.sh/jane"}
            const res=await client.api.school.$post({json})
            if (!res.ok) throw new Error(res.statusText)
            return res.json()
        },
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["school"]})
        }
    })
}
export const useUpdateSchool = () => {
    const queryClient=useQueryClient()
    return useMutation({
        mutationFn:async ({data,id}:{data:InsertSchool,id:number})=>{
            const json=data.logo ?data :{...data,logo:"https://avatar.vercel.sh/jane"}
            const res=await client.api.school[":id"].$put({json,param:{id:id.toString()}})
            if (!res.ok) throw new Error(res.statusText)
            return res.json()
        },
           onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["school"]})
        }
    })
}