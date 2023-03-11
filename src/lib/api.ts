type Verbs = "POST" | "PUT" | "GET" | "DELETE";

type FetcherType = {
  url: string;
  method: Verbs;
  body: {};
  json?: boolean;
};

const fetcher = async ({
  url,
  method = "GET",
  body,
  json = true,
}: FetcherType) => {
  const res = await fetch(url, {
    method,
    ...(body && {body: JSON.stringify(body)}),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();

    return data;
  }
};

export const register = async (user: Partial<User>) => {
  return fetcher({
    url: "/api/register",
    method: "POST",
    body: user,
  });
};

export const signin = async (user: Partial<User>) => {
  return fetcher({
    url: "/api/signin",
    method: "POST",
    body: user,
  });
};
