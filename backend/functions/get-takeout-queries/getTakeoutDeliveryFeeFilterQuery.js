export const getTakeoutDeliveryFeeFilterQuery = (
  minDeliveryFeeValues,
  maxDeliveryFeeValues
) => {
  if (minDeliveryFeeValues && maxDeliveryFeeValues) {
    return {
      delivery_fee: {
        $gte: minDeliveryFeeValues,
        $lte: maxDeliveryFeeValues,
      },
    };
  }
};
