import { FormFieldItem } from "@/modules/core/components/Form/FormBuilder";
import { FILE } from "@/modules/core/components/Form/FormBuilder/builder.constant";
import { roomsOptions } from "@/modules/core/data";

export const roomFormData: Array<FormFieldItem> = [
  {
    name: "name",
    type: "text",
    label: "Name",
  },
  {
    name: "slug",
    type: "text",
    label: "Slug",
  },
  {
    name: "images",
    type: "file",
    label: "Images of Room",
    multiple: true,
  },
  {
    name: "bedType",
    type: "select",
    label: "Select Room Types",
    options: roomsOptions,
  },
  {
    name: "description",
    type: "textarea",
    label: "Description",
  },
];
