import Payment from "@components/payment";

export const createSubscription =
  (payment: Payment) =>
  async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    const response = await fetch("/api/payment/subscription", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ payment }),
    });
    const data = await response.json();

    dispatch({ type: "CREATE_PAYMENT_SUCCESS", payload: data.payment });
  };
