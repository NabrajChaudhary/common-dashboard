"use client";

import FormBuilder from "@/modules/core/components/Form/FormBuilder";
import React from "react";
import { configData } from "./config-data";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMetaData } from "../services/index.services";
import { publicAxios } from "@/lib/axios";

export const formSchema = z.object({
  aboutText: z.string().min(5, { message: "About text text is required" }),
  copyrightText: z.string().min(5, { message: "Copyright text is required" }),
  email: z.string().min(5, { message: "Email is required" }),
  location: z.string(),
  phone: z.string(),
  logo: z.any(),
});

const ConfigForm = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["site-meta"],
    queryFn: fetchMetaData,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (data) => {
      return await publicAxios.put("/site-meta/footer", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    mutationKey: ["site-meta", "footer"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["site-meta"] });
    },
  });

  if (isLoading) return <p>..Loading..</p>;

  const defaultValues = {
    aboutText: data?.meta.footer.aboutText || "",
    copyrightText: data?.meta.footer.copyrightText || "",
    email: data?.meta.footer.email || "",
    location: data?.meta.footer.location || "",
    phone: data?.meta.footer.phone || "",
    logo: data?.meta.footer.logo || null,
  };

  return (
    <>
      <FormBuilder
        className="text-left"
        title="Footer"
        defaultValues={defaultValues}
        formBuilderData={configData}
        schema={formSchema}
        formLayout="two-col"
        submitText="update"
        loading={isPending}
        onSubmit={async (data) => await mutateAsync(data)}
      />
    </>
  );
};

export default ConfigForm;
