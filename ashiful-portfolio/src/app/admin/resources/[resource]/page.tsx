"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import ResourceCrud from "@/components/admin/ResourceCrud";
import { getResource } from "@/lib/admin-resources";

export default function AdminResourcePage({
  params,
}: {
  params: Promise<{ resource: string }>;
}) {
  const { resource } = use(params);
  const config = getResource(resource);
  if (!config) notFound();
  return <ResourceCrud config={config} />;
}
