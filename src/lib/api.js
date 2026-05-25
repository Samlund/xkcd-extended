async function request(path, options = {}) {
    const { body, headers, ...rest } = options;

    const response = await fetch(path, {
        ...rest,
        headers: {
            "Content-Type": "application/json",
            ...headers
        },
        body: body ? JSON.stringify(body) : undefined
    })

    if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`)
    }

    const res = await response.text();
    return res ? JSON.parse(res) : undefined;
}

export const api = {
    get: (path, options) => request(path, { ...options, method: "GET" }),
}