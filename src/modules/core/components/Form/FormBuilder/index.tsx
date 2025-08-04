"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z, ZodTypeAny } from "zod";
import Image from "next/image";
import { Trash2, Check } from "lucide-react";
import clsx from "clsx";
import {
  DATE,
  EMAIL,
  FILE,
  NUMBER,
  PASSWORD,
  RATING,
  SELECT,
  SWITCH,
  TEXT,
  TEXTAREA,
} from "./builder.constant";

import { Card, CardContent } from "@/modules/core/components/ui/card";
import { Input } from "@/modules/core/components/ui/input";
import { Button } from "@/modules/core/components/ui/button";
import { Textarea } from "@/modules/core/components/ui/textarea";
import { Switch } from "@/modules/core/components/ui/switch";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/modules/core/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/modules/core/components/ui/select";
import { cn } from "@/lib/utils";
import { Rating } from "../RatingInput";

type FormBuilderProps = {
  schema: ZodTypeAny;
  formBuilderData: Array<FormFieldItem>;
  defaultValues: {
    [key: string]: string | number | boolean | File | File[] | null | unknown;
  };
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (data: any) => void;
  title?: string;
  description?: string;
  submitText?: string;
  className?: string;
  formLayout?: "two-col" | "one-col";
  buttonClass?: string;
};

export type FormFieldItem = {
  name: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  options?: Array<{ id: string; label: string }>;
  placeholder?: string;
  className?: string;
  multiple?: boolean;
};

const FormBuilder = ({
  formBuilderData,
  schema,
  defaultValues,
  onSubmit: externalSubmit,
  formLayout = "two-col",
  title,
  description,
  submitText = "Submit",
  className,
  loading = false,
  buttonClass,
}: FormBuilderProps) => {
  const [filePreview, setFilePreview] = React.useState<
    Record<string, string | string[]>
  >({});

  const form = useForm<z.infer<ZodTypeAny>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: z.infer<ZodTypeAny>) => {
    externalSubmit?.(data);
  };

  React.useEffect(() => {
    const initialPreview: Record<string, string | string[]> = {};

    formBuilderData.forEach((item) => {
      if (item.type === FILE) {
        const value = defaultValues[item.name];
        if (value) {
          if (Array.isArray(value)) {
            initialPreview[item.name] = value.map((v) =>
              typeof v === "string" ? v : URL.createObjectURL(v)
            );
          } else if (typeof value === "string") {
            initialPreview[item.name] = value;
          } else if (value instanceof File) {
            initialPreview[item.name] = URL.createObjectURL(value);
          }
        }
      }
    });

    setFilePreview(initialPreview);
  }, [defaultValues, formBuilderData]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    multiple = false
  ) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (multiple) {
      form.setValue(fieldName, files);
      setFilePreview((prev) => ({
        ...prev,
        [fieldName]: files.map((file) => URL.createObjectURL(file)),
      }));
    } else {
      form.setValue(fieldName, files[0]);
      setFilePreview((prev) => ({
        ...prev,
        [fieldName]: URL.createObjectURL(files[0]),
      }));
    }
  };

  const handleFileRemove = (
    fieldName: string,
    index?: number,
    multiple = false
  ) => {
    const preview = filePreview[fieldName];

    if (multiple && Array.isArray(preview)) {
      const updatedFiles = (form.getValues(fieldName) || []).filter(
        (_: File, i: number) => i !== index
      );
      form.setValue(fieldName, updatedFiles);

      URL.revokeObjectURL(preview[index!]);
      const updatedPreviews = preview.filter((_, i) => i !== index);
      setFilePreview((prev) => ({
        ...prev,
        [fieldName]: updatedPreviews,
      }));
    } else {
      form.setValue(fieldName, null);
      if (typeof preview === "string") {
        URL.revokeObjectURL(preview);
      }
      setFilePreview((prev) => {
        const newPreview = { ...prev };
        delete newPreview[fieldName];
        return newPreview;
      });
    }
  };

  return (
    <Card className={clsx("shadow-lg border-0", className)}>
      <CardContent className="p-6">
        {(title || description) && (
          <div className="mb-6 text-left">
            {title && <h2 className="text-2xl font-bold mb-2">{title}</h2>}
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div
              className={clsx(
                "grid gap-6",
                formLayout === "two-col" ? "sm:grid-cols-2" : "grid-cols-1"
              )}
            >
              {formBuilderData.map((item, index) => {
                return (
                  <FormField
                    key={index}
                    control={form.control}
                    name={item.name}
                    render={({ field }) => {
                      switch (item.type) {
                        case TEXT: {
                          return (
                            <FormItem
                              className={clsx("transition-all", item.className)}
                            >
                              <FormLabel className="text-sm font-medium">
                                {item.label}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={item.placeholder || item.label}
                                  type="text"
                                  className="rounded-md"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          );
                        }
                        case EMAIL: {
                          return (
                            <FormItem
                              className={clsx("transition-all", item.className)}
                            >
                              <FormLabel className="text-sm font-medium">
                                {item.label}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={item.placeholder || item.label}
                                  type="email"
                                  className="rounded-md"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          );
                        }
                        case PASSWORD: {
                          return (
                            <FormItem
                              className={clsx("transition-all", item.className)}
                            >
                              <FormLabel className="text-sm font-medium">
                                {item.label}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={item.placeholder || item.label}
                                  type="password"
                                  className="rounded-md"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          );
                        }
                        case NUMBER: {
                          return (
                            <FormItem
                              className={clsx("transition-all", item.className)}
                            >
                              <FormLabel className="text-sm font-medium">
                                {item.label}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={item.placeholder || item.label}
                                  type="number"
                                  className="rounded-md"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          );
                        }
                        case FILE:
                          return (
                            <FormItem
                              className={clsx(
                                "transition-all col-span-2",
                                item.className
                              )}
                            >
                              <FormLabel className="text-sm font-medium">
                                {item.label}
                              </FormLabel>
                              <FormControl>
                                <div>
                                  {filePreview[item.name] && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {Array.isArray(filePreview[item.name]) ? (
                                        (
                                          filePreview[item.name] as string[]
                                        ).map((src, index) => (
                                          <div
                                            key={index}
                                            className="relative w-[100px] h-[100px]"
                                          >
                                            <Image
                                              src={src}
                                              alt="Preview"
                                              width={200}
                                              height={200}
                                              className="w-[100px] h-[100px] object-cover rounded"
                                            />
                                            <Button
                                              type="button"
                                              variant="destructive"
                                              size="icon"
                                              className="absolute top-2 right-2 h-7 w-7"
                                              onClick={() =>
                                                handleFileRemove(
                                                  item.name,
                                                  index,
                                                  true
                                                )
                                              }
                                            >
                                              <Trash2 className="h-4 w-4" />
                                            </Button>
                                          </div>
                                        ))
                                      ) : (
                                        <div className="relative w-[100px] h-[100px]">
                                          <Image
                                            src={
                                              filePreview[item.name] as string
                                            }
                                            alt="Preview"
                                            width={200}
                                            height={200}
                                            className="w-[100px] h-[100px] object-cover rounded"
                                          />
                                          <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute top-2 right-2 h-7 w-7"
                                            onClick={() =>
                                              handleFileRemove(
                                                item.name,
                                                undefined,
                                                false
                                              )
                                            }
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                                    <Input
                                      id={item.name}
                                      type="file"
                                      onChange={(e) =>
                                        handleFileChange(
                                          e,
                                          item.name,
                                          item.multiple ?? false
                                        )
                                      }
                                      className="hidden"
                                      accept="image/*"
                                      multiple={item.multiple}
                                    />
                                    <label
                                      htmlFor={item.name}
                                      className="cursor-pointer block"
                                    >
                                      <div className="flex flex-col items-center gap-2">
                                        <div className="p-2 rounded-full bg-primary/10">
                                          <Trash2 className="h-5 w-5 text-primary" />
                                        </div>
                                        <span className="text-sm font-medium">
                                          Click to upload
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          SVG, PNG, JPG or GIF (max. 2MB)
                                        </span>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          );
                        case TEXTAREA: {
                          return (
                            <FormItem
                              className={clsx("transition-all", item.className)}
                            >
                              <FormLabel className="text-sm font-medium">
                                {item.label}
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder={item.placeholder || item.label}
                                  className="resize-y min-h-[200px] rounded-md"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          );
                        }
                        case SWITCH: {
                          return (
                            <FormItem
                              className={clsx(
                                "flex flex-row items-center justify-between rounded-lg border p-4",
                                item.className
                              )}
                            >
                              <div className="space-y-0.5">
                                <FormLabel className="text-sm font-medium">
                                  {item.label}
                                </FormLabel>
                                <FormMessage className="text-xs" />
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value as boolean}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-primary"
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }
                        case SELECT: {
                          return (
                            <FormItem
                              className={clsx("transition-all", item.className)}
                            >
                              <FormLabel className="text-sm font-medium">
                                {item.label}
                              </FormLabel>
                              <FormControl className="w-full">
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value as string}
                                >
                                  <FormControl>
                                    <SelectTrigger className="rounded-md min-w-full">
                                      <SelectValue
                                        className="min-w-full"
                                        placeholder={
                                          item.placeholder || item.label
                                        }
                                      />
                                      {/* <ChevronDown className="h-4 w-4 opacity-50" /> */}
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="min-w-full">
                                    {item.options?.map((option) => (
                                      <SelectItem
                                        key={option.id}
                                        value={option.id}
                                        className="min-w-full"
                                      >
                                        {option.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          );
                        }
                        case DATE: {
                          return (
                            <FormItem
                              className={clsx("transition-all", item.className)}
                            >
                              <FormLabel className="text-sm font-medium">
                                {item.label}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={item.placeholder || item.label}
                                  type="date"
                                  className="rounded-md placeholder:capitalize"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          );
                        }
                        case RATING: {
                          return (
                            <FormItem
                              className={clsx("transition-all", item.className)}
                            >
                              <FormLabel className="text-sm font-medium">
                                {item.label}
                              </FormLabel>
                              <FormControl>
                                <Rating
                                  value={field.value}
                                  onChange={field.onChange}
                                  size="lg"
                                  className="mt-2 ring-0 focus:ring-0 "
                                  max={5}
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          );
                        }
                        default: {
                          return <></>;
                        }
                      }
                    }}
                  />
                );
              })}
            </div>
            <Button
              type="submit"
              className={clsx(
                "w-auto rounded-md py-2.5 font-medium transition-all flex items-center justify-center gap-2",
                buttonClass
              )}
              disabled={loading}
            >
              {loading && (
                <svg
                  className={cn("mr-2 h-4 w-4 animate-spin")}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {submitText}
              <Check className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormBuilder;
