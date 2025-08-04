"use client";
import FormBuilder from "@/modules/core/components/Form/FormBuilder";
import React from "react";
import { z } from "zod";
import { roomFormData } from "./add-rooms-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publicAxios } from "@/lib/axios";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  images: z.any(),
  //   images: z
  //     .any()
  //     .refine(
  //       (files) => !files || files.length > 0,
  //       "At least one image is required"
  //     )
  //     .refine(
  //       (files) =>
  //         !files ||
  //         Array.from(files).every((file) => file.size <= 4 * 1024 * 1024),
  //       "Each image must be less than 3MB"
  //     )
  //     .optional(),
  name: z.string().min(5, { message: "name is required" }),
  bedType: z.string(),
  capacity: z.number().min(1).max(10),
  description: z.string(),
  slug: z.string(),
  pricePerNight: z.any(),
  numberOfRoom: z.number().min(1),
  amenities: z.any(),
  isAvailable: z.boolean(),
  isFeatured: z.boolean(),
});

const defaultValues = {
  bedType: "king",
  capacity: 1,
  description: "Nabu Baba Desc",
  images: [],
  name: "Hello",
  numberOfRoom: 2,
  pricePerNight: 1000,
  slug: "/asassa",
  amenities: ["one", "two"],
  isAvailable: true,
  isFeatured: false,
};

const AddRoomModule = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation<typeof defaultValues>({
    mutationFn: async (data) => {
      return await publicAxios.post("/room/add", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    mutationKey: ["rooms"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      router.push("/dashboard/rooms");
    },
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    for (const key in data) {
      const value = data[key];

      if (key === "images") {
        // Handle multiple files
        if (value instanceof FileList || Array.isArray(value)) {
          Array.from(value).forEach((file) => {
            formData.append("images", file); // same key name for multiple
          });
        }
      } else {
        formData.append(key, value);
      }
    }

    await mutateAsync(formData);
  };
  return (
    <div>
      <FormBuilder
        defaultValues={defaultValues}
        formBuilderData={roomFormData}
        schema={formSchema}
        formLayout="two-col"
        submitText="Add Room"
        onSubmit={onSubmit}
        // loading={loading}
        loading={isPending}
      />
    </div>
  );
};

export default AddRoomModule;
