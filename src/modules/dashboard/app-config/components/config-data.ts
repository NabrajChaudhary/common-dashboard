import { FormFieldItem } from "@/modules/core/components/Form/FormBuilder";

export const configData: Array<FormFieldItem> = [
  {
    name: "aboutText",
    type: "text",
    label: "About Text",
  },
  {
    name: "copyrightText",
    type: "text",
    label: "Copyright Text",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "",
  },
  {
    name: "location",
    type: "text",
    label: "Location",
    placeholder: "",
  },
  {
    name: "phone",
    type: "number",
    label: "Phone Number",
    placeholder: "",
  },
  {
    name: "logo",
    type: "file",
    label: "Footer Logo",
  },
];
