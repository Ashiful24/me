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
  path: string;
  idKey?: string;
  columns: { key: string; label: string }[];
  fields: FieldConfig[];
  listQuery?: (userId: string) => string;
};

export const ADMIN_RESOURCES: ResourceConfig[] = [
  {
    key: "projects",
    label: "Projects",
    path: "/projects",
    columns: [
      { key: "title", label: "Title" },
      { key: "file", label: "File" },
      { key: "sortOrder", label: "Order" },
    ],
    fields: [
      { key: "userId", label: "User ID", type: "hidden", fromUserId: true, required: true },
      { key: "file", label: "File name", required: true },
      { key: "title", label: "Title", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "github", label: "GitHub URL" },
      { key: "live", label: "Live URL" },
      { key: "sortOrder", label: "Sort order", type: "number" },
    ],
    listQuery: (userId) => `?userId=${encodeURIComponent(userId)}`,
  },
  {
    key: "project-tags",
    label: "Project tags",
    path: "/project-tags",
    columns: [
      { key: "name", label: "Name" },
      { key: "projectId", label: "Project ID" },
    ],
    fields: [
      { key: "userId", label: "User ID", type: "hidden", fromUserId: true, required: true },
      { key: "projectId", label: "Project ID", required: true },
      { key: "name", label: "Tag name", required: true },
    ],
    listQuery: (userId) => `?userId=${encodeURIComponent(userId)}`,
  },
  {
    key: "project-credentials",
    label: "Project credentials",
    path: "/project-credentials",
    columns: [
      { key: "label", label: "Label" },
      { key: "value", label: "Value" },
      { key: "projectId", label: "Project ID" },
    ],
    fields: [
      { key: "userId", label: "User ID", type: "hidden", fromUserId: true, required: true },
      { key: "projectId", label: "Project ID", required: true },
      { key: "label", label: "Label", required: true },
      { key: "value", label: "Value", required: true },
    ],
    listQuery: (userId) => `?userId=${encodeURIComponent(userId)}`,
  },
  {
    key: "stats",
    label: "Stats",
    path: "/stats",
    columns: [
      { key: "value", label: "Value" },
      { key: "label", label: "Label" },
      { key: "sortOrder", label: "Order" },
    ],
    fields: [
      { key: "userId", label: "User ID", type: "hidden", fromUserId: true, required: true },
      { key: "value", label: "Value", required: true },
      { key: "label", label: "Label", required: true },
      { key: "sortOrder", label: "Sort order", type: "number" },
    ],
    listQuery: (userId) => `?userId=${encodeURIComponent(userId)}`,
  },
  {
    key: "experiences",
    label: "Experiences",
    path: "/experiences",
    columns: [
      { key: "title", label: "Title" },
      { key: "subtitle", label: "Subtitle" },
      { key: "sortOrder", label: "Order" },
    ],
    fields: [
      { key: "userId", label: "User ID", type: "hidden", fromUserId: true, required: true },
      { key: "title", label: "Title", required: true },
      { key: "subtitle", label: "Subtitle", required: true },
      { key: "sortOrder", label: "Sort order", type: "number" },
    ],
    listQuery: (userId) => `?userId=${encodeURIComponent(userId)}`,
  },
  {
    key: "experience-highlights",
    label: "Experience highlights",
    path: "/experience-highlights",
    columns: [
      { key: "text", label: "Text" },
      { key: "experienceId", label: "Experience ID" },
      { key: "sortOrder", label: "Order" },
    ],
    fields: [
      { key: "userId", label: "User ID", type: "hidden", fromUserId: true, required: true },
      { key: "experienceId", label: "Experience ID", required: true },
      { key: "text", label: "Text", type: "textarea", required: true },
      { key: "sortOrder", label: "Sort order", type: "number" },
    ],
    listQuery: (userId) => `?userId=${encodeURIComponent(userId)}`,
  },
  {
    key: "services",
    label: "Services",
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
    label: "Contact links",
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
    key: "skill-groups",
    label: "Skill groups",
    path: "/skill-groups",
    columns: [
      { key: "title", label: "Title" },
      { key: "sortOrder", label: "Order" },
    ],
    fields: [
      { key: "userId", label: "User ID", type: "hidden", fromUserId: true, required: true },
      { key: "title", label: "Title", required: true },
      { key: "sortOrder", label: "Sort order", type: "number" },
    ],
    listQuery: (userId) => `?userId=${encodeURIComponent(userId)}`,
  },
  {
    key: "skills",
    label: "Skills",
    path: "/skills",
    columns: [
      { key: "title", label: "Title" },
      { key: "parentId", label: "Group ID" },
      { key: "iconKey", label: "Icon" },
    ],
    fields: [
      { key: "userId", label: "User ID", type: "hidden", fromUserId: true, required: true },
      { key: "parentId", label: "Skill group ID", required: true },
      { key: "title", label: "Title", required: true },
      { key: "iconKey", label: "Icon key", required: true },
      { key: "color", label: "Color class", required: true },
      { key: "sortOrder", label: "Sort order", type: "number" },
    ],
    listQuery: (userId) => `?userId=${encodeURIComponent(userId)}`,
  },
  {
    key: "skill-details",
    label: "Skill details",
    path: "/skill-details",
    columns: [
      { key: "skillId", label: "Skill ID" },
      { key: "knowledge", label: "Knowledge" },
    ],
    fields: [
      { key: "userId", label: "User ID", type: "hidden", fromUserId: true, required: true },
      { key: "skillId", label: "Skill ID", required: true },
      { key: "knowledge", label: "Knowledge", type: "textarea", required: true },
      { key: "experience", label: "Experience", type: "textarea", required: true },
      { key: "stats", label: "Stats", type: "textarea", required: true },
    ],
    listQuery: (userId) => `?userId=${encodeURIComponent(userId)}`,
  },
  {
    key: "users",
    label: "Users",
    path: "/users",
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
