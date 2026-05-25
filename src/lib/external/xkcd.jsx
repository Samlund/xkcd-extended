import { api } from "@/lib/api.js";

const BASE_URL = "/xkcd";

export const xkcd = {
    getLatest: async () => api.get(`${BASE_URL}/info.0.json`),
    getById: async (id) => api.get(`${BASE_URL}/${id}/info.0.json`),
}