export const getTakeoutDeliveryFeeFilterQuery = (
  minDeliveryFeeValues,
  maxDeliveryFeeValues
) => {
  return {
    delivery_fee: {
      $gte: minDeliveryFeeValues,
      $lte: maxDeliveryFeeValues,
    },
  };
};
