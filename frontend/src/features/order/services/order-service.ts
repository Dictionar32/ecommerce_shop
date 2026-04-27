import { Http } from "@/lib/core/api-client";
import { OrderApiContract } from "../contracts/api-contract";
import { OrderMapper } from "../mappers/order-mapper";
import type { OrderRead } from "../types/order-read";
import { OrderFormValues } from "../contracts/api-schema";

interface ApiWrapper<T> { data: T; }

// Unwrap items dari ResourceCollection wrapper jika ada
function unwrapItems(items: unknown): any[] {
    if (Array.isArray(items)) return items;
    if (items && typeof items === 'object' && 'data' in items) return (items as any).data;
    return [];
}

function parseOrder(raw: unknown): OrderRead.Show {
    // inject unwrapped items sebelum validate
    const obj = raw as any;
    if (obj?.items && !Array.isArray(obj.items)) {
        obj.items = unwrapItems(obj.items);
    }
    const validated = OrderApiContract.validateSchema(obj);
    return OrderMapper.toApiRead(validated);
}

export const OrderService = {
    /** GET /orders */
    async index(): Promise<OrderRead.Index[]> {
        const res = await Http.get<ApiWrapper<unknown>>("/orders");
        const raw = res.data as any;
        // ResourceCollection: { data: [...] }
        const arr = Array.isArray(raw) ? raw : (raw?.data ?? []);
        return arr.map((item: unknown) => parseOrder(item));
    },

    /** GET /orders/:id */
    async show(id: number): Promise<OrderRead.Show> {
        const res = await Http.get<ApiWrapper<unknown>>(`/orders/${id}`);
        return parseOrder(res.data);
    },

    /** POST /checkout */
    async create(form: OrderFormValues.Create): Promise<OrderRead.Show> {
        const payload = OrderMapper.toApiCreate(form);
        const res = await Http.post<ApiWrapper<unknown>>("/checkout", payload);
        return parseOrder(res.data);
    },
};
