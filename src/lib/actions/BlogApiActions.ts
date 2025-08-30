"use server";

import { API_BASE_URL } from "@/config/config";
import { getSessionToken } from "@/lib/auth-utils";
import { BlogResponse } from "@/services/blogEndpoints";
import { logFormDataKeysValues } from "@/utils/helper";
import { revalidateTag } from "next/cache";

export async function addBlog(formData: FormData): Promise<BlogResponse> {
  // Get the session token
  const token = await getSessionToken();

  if (!token) {
    throw new Error("Unauthorized: No valid session found");
  }

  const endpoint = "/api/blogs";
  console.log(endpoint);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(
      `Failed to add blog: ${response.status} ${response.statusText}. Details: ${errorData}`
    );
  }

  const data = await response.json();

  revalidateTag("blogs");
  return data;
}
export async function updateBlog(
  id: string,
  formData: FormData
): Promise<BlogResponse> {
  // Get the session token
  const token = await getSessionToken();

  if (!token) {
    throw new Error("Unauthorized: No valid session found");
  }

  const endpoint = `/api/blogs/${id}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(
      `Failed to update blog: ${response.status} ${response.statusText}. Details: ${errorData}`
    );
  }

  const data = await response.json();

  revalidateTag("blogs");
  return data;
}

export async function deleteBlog(id: string): Promise<BlogResponse> {
  // Get the session token
  const token = await getSessionToken();

  if (!token) {
    throw new Error("Unauthorized: No valid session found");
  }

  const endpoint = `/api/blogs/${id}`;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(` ${errorData}`);
  }

  const data = await response.json();
  revalidateTag("blogs");
  return data;
}
