// hooks/use-testimonial.ts
import { InsertTestimonialType, TestimonialType } from "@/db/schemas/testimonials";
import { client } from "@/lib/hono";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useGetTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const res = await client.api.testimonial.$get();
      if (!res.ok) {
        throw new Error("An error occurred");
      }
      return res.json();
    }
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, TestimonialType>({
    mutationFn: async (data: TestimonialType) => {
      const res = await client.api.testimonial.$put({ json: data });
      if (!res.ok) {
        throw new Error("An error occurred");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    }
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, InsertTestimonialType>({
    mutationFn: async (data: InsertTestimonialType) => {
      const res = await client.api.testimonial.$post({ json: data });
      if (!res.ok) {
        throw new Error("An error occurred");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    }
  });
};