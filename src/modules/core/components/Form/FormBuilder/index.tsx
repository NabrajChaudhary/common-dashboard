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
  formLayout?: "two-col" | "one-col";
  defaultValues: {
    [key: string]: string | number | boolean | File | null | unknown;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (data: any) => void;
  title?: string;
  description?: string;
  submitText?: string;
  className?: string;
  loading: boolean;
  buttonClass?: string;
};

export type FormFieldItem = {
  name: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  options?: Array<{ id: string; label: string }>;
  placeholder?: string;
  className?: string;
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
  const [filePreview, setFilePreview] = React.useState<Record<string, string>>(
    {}
  );

  const form = useForm<z.infer<ZodTypeAny>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  function onSubmit(data: z.infer<ZodTypeAny>) {
    if (externalSubmit) {
      externalSubmit(data);
    } else {
      console.log(JSON.stringify(data, null, 2), "Form data");
    }
  }

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Update form value
      form.setValue(fieldName, file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setFilePreview((prev) => ({
        ...prev,
        [fieldName]: previewUrl,
      }));
    }
  };

  const handleFileRemove = (fieldName: string) => {
    // Clear form value
    form.setValue(fieldName, null);

    // Revoke object URL to prevent memory leaks
    if (filePreview[fieldName]) {
      URL.revokeObjectURL(filePreview[fieldName]);
    }

    // Remove preview
    setFilePreview((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[fieldName];
      return newPreviews;
    });
  };

  return (
    <Card className={clsx("shadow-lg border-0", className)}>
      <CardContent className="p-6">
        {(title || description) && (
          <div className="mb-6 text-center">
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
              {formBuilderData.map((item, index) => (
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
                              {!filePreview[item.name] ? (
                                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-4 text-center hover:bg-muted/50 transition-colors cursor-pointer">
                                  <Input
                                    placeholder={item.placeholder || item.label}
                                    id={item.name}
                                    type="file"
                                    onChange={(e) =>
                                      handleFileChange(e, item.name)
                                    }
                                    className="hidden"
                                    accept="image/*"
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
                              ) : null}
                            </FormControl>
                            <FormMessage className="text-xs" />
                            {filePreview[item.name] && (
                              <div className="relative w-full max-w-[200px] h-auto mt-2">
                                <Image
                                  src={
                                    filePreview[item.name] || "/placeholder.svg"
                                  }
                                  alt="Preview"
                                  width={50}
                                  height={50}
                                  quality={100}
                                  className="rounded-md object-cover w-full h-auto"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 right-2 h-7 w-7 rounded-full shadow-lg"
                                  onClick={() => handleFileRemove(item.name)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
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
              ))}
            </div>
            <Button
              type="submit"
              className={clsx(
                "w-full rounded-md py-2.5 font-medium transition-all flex items-center justify-center gap-2",
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
