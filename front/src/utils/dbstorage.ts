export type DBInput = string | string[] | null | undefined;
export type DBValInput = any;
function normalize(input: DBInput | DBValInput) {
  if (input === null || input === undefined) return undefined;
  if (Array.isArray(input)) return input;
  return input; // keep string
}

async function request<T = any>(route: string, body: Record<string, any>): Promise<T> {
  const res = await fetch(`https://dbstorage.onrender.com/${route}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`dbStorage error (${route}): ${await res.text()}`);
  }

  return res.json();
}

export const dbStorage = {
  async setItem(
    app: DBInput,
    collectionName: DBInput,
    collectionKey: DBInput,
    key: DBInput,
    value: DBValInput
  ) {
    return request("setItem", {
      app: normalize(app),
      collectionName: normalize(collectionName),
      collectionKey: normalize(collectionKey),
      key: normalize(key),
      value: normalize(value),
    });
  },

  async getItem(
    app: DBInput,
    collectionName: DBInput,
    collectionKey: DBInput,
    key: DBInput,
    value: DBValInput
  ) {
    return request("getItem", {
      app: normalize(app),
      collectionName: normalize(collectionName),
      collectionKey: normalize(collectionKey),
      key: normalize(key),
      value: normalize(value),
    });
  },

  async removeItem(
    app: DBInput,
    collectionName: DBInput,
    collectionKey: DBInput,
    key: DBInput,
    value: DBValInput
  ) {
    return request("removeItem", {
      app: normalize(app),
      collectionName: normalize(collectionName),
      collectionKey: normalize(collectionKey),
      key: normalize(key),
      value: normalize(value),
    });
  },
};
