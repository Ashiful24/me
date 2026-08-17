export type FieldType = "text" | "textarea" | "number" | "hidden";

export type FieldConfig = {
  key: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  fromUserId?: boolean;
};

export type ResourceConfig = {
  key: string;
  label: string;
  singular: string;
  path: string;
  idKey?: string;
  columns: { key: string; label: string }[];
  fields: FieldConfig[];
  listQuery?: (userId: string) => string;
  canCreate?: boolean;
  canDelete?: boolean;
};

export const ADMIN_RESOURCES: ResourceConfig[] = [
  {
    key: "services",
    label: "Services",
    singular: "service",
    path: "/services",
    columns: [
      { key: "description", label: "Description" },
      { key: "sortOrder", label: "Order" },
    ],
    fields: [
      { key: "userId", label: "User ID", type: "hidden", fromUserId: true, required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "sortOrder", label: "Sort order", type: "number" },
    ],
    listQuery: (userId) => `?userId=${encodeURIComponent(userId)}`,
  },
  {
    key: "timeline-entries",
    label: "Timeline",
    singular: "timeline",
    path: "/timeline-entries",
    columns: [
      { key: "year", label: "Year" },
      { key: "title", label: "Title" },
      { key: "sortOrder", label: "Order" },
    ],
    fields: [
      { key: "userId", label: "User ID", type: "hidden", fromUserId: true, required: true },
      { key: "year", label: "Year", required: true },
      { key: "title", label: "Title", required: true },
      { key: "text", label: "Text", type: "textarea", required: true },
      { key: "sortOrder", label: "Sort order", type: "number" },
    ],
    listQuery: (userId) => `?userId=${encodeURIComponent(userId)}`,
  },
  {
    key: "testimonials",
    label: "Testimonials",
    singular: "testimonial",
    path: "/testimonials",
    columns: [
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
      { key: "sortOrder", label: "Order" },
    ],
    fields: [
      { key: "userId", label: "User ID", type: "hidden", fromUserId: true, required: true },
      { key: "quote", label: "Quote", type: "textarea", required: true },
      { key: "name", label: "Name", required: true },
      { key: "role", label: "Role", required: true },
      { key: "sortOrder", label: "Sort order", type: "number" },
    ],
    listQuery: (userId) => `?userId=${encodeURIComponent(userId)}`,
  },
  {
    key: "contact-links",
    label: "Contact",
    singular: "contact",
    path: "/contact-links",
    columns: [
      { key: "label", label: "Label" },
      { key: "value", label: "Value" },
      { key: "sortOrder", label: "Order" },
    ],
    fields: [
      { key: "userId", label: "User ID", type: "hidden", fromUserId: true, required: true },
      { key: "label", label: "Label", required: true },
      { key: "value", label: "Value", required: true },
      { key: "href", label: "Href", required: true },
      { key: "iconKey", label: "Icon key", required: true },
      { key: "color", label: "Color class", required: true },
      { key: "sortOrder", label: "Sort order", type: "number" },
    ],
    listQuery: (userId) => `?userId=${encodeURIComponent(userId)}`,
  },
  {
    key: "users",
    label: "Users",
    singular: "user",
    path: "/users",
    canCreate: false,
    canDelete: false,
    columns: [
      { key: "email", label: "Email" },
      { key: "username", label: "Username" },
      { key: "role", label: "Role" },
    ],
    fields: [{ key: "username", label: "Username", required: true }],
  },
];

export function getResource(key: string) {
  return ADMIN_RESOURCES.find((r) => r.key === key);
}
