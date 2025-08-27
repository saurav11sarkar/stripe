export interface IPayment {
  stripeId: string;
  amount: number;
  currency: string;
  status: string;
  customerEmail: string;
  // Potentially add more fields like:
  // customerId?: string;
  // paymentIntentId?: string;
  // receiptUrl?: string;
}