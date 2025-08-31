import { API_BASE_URL } from "@/config/config";
import { getSessionToken } from "@/lib/auth-utils";
import type {
  ApiResponse,
  Blog,
} from "@/utils/types/definitations/definitations";

export type BlogsResponse = ApiResponse<Blog[]>;
export type BlogResponse = ApiResponse<Blog>;

export async function fetchAllBlogs(): Promise<BlogsResponse> {
  // Get the session token
  const token = await getSessionToken();

  if (!token) {
    throw new Error("Unauthorized: No valid session found");
  }
  const endpoint = `/api/blogs`;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["blogs"] },
      cache: "force-cache",
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to fetch blogs: ${response.status} ${response.statusText}. Details: ${errorData}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching blogs:", error);
    throw new Error("Error feching blogs"); // This will activate the closest `error.js` Error Boundary
  }
}

export async function searchAllBlogs(searchParams: {
  search: string;
}): Promise<BlogsResponse> {
  // Get the session token
  const token = await getSessionToken();

  if (!token) {
    throw new Error("Unauthorized: No valid session found");
  }

  //Get ths params from search params
  const { search } = searchParams;

  const endpoint = `/api/blogs?search=${search}`;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["blogs"] },
      cache: "force-cache",
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to fetch search blogs: ${response.status} ${response.statusText}. Details: ${errorData}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching blogs:", error);
    throw new Error("Error feching blogs");
  }
}
export async function fetchBlogDetails(id: string): Promise<BlogResponse> {
  // Get the session token
  const token = await getSessionToken();

  if (!token) {
    throw new Error("Unauthorized: No valid session found");
  }

  const endpoint = `/api/blogs/${id}`;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { tags: ["blogs"] },
      cache: "force-cache",
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(
        `Failed to fetch blog details: ${response.status} ${response.statusText}. Details: ${errorData}`
      );
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error fetching blog details:", error);
    throw new Error("Error fetching blog details");
  }
}
