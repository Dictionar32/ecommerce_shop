import { Http } from "@/lib/core/api-client"
import { PaymentFormValues } from "../contracts/api-schema"
import type { PaymentRead } from "../types/payment-read"
import { PaymentMapper } from "../mappers/payment-mapper"

interface PaymentResponse { data: unknown }

export const PaymentService = {
  /** POST /payment/{orderId} */
  async create(orderId: number, form: PaymentFormValues.Create): Promise<PaymentRead.Show> {
    const payload: Record<string, unknown> = {
      metode: form.metode,
      provider: form.provider ?? "mock",
    }
    if (form.idempotencyKey) payload.idempotency_key = form.idempotencyKey
    if (form.detail)         payload.detail          = form.detail
    if (form.gatewayCode)    payload.gateway_code    = form.gatewayCode
    if (form.gatewayMessage) payload.gateway_message = form.gatewayMessage

    const res = await Http.post<PaymentResponse>(`/payment/${orderId}`, payload)
    // PaymentResource returns { id, order_id, ... } – not wrapped in .data
    const raw = (res as any).data ?? res
    return PaymentMapper.toApiRead(raw as any)
  },
}
