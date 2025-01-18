export const formatPrice = (price: number) => {
    if (isNaN(+price)) return;

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
};
