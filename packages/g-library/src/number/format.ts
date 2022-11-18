export const formatCurrency = (
    value: number,
    minimumFractionDigits = 2,
    currency = 'USD'
): string => {
    // if (!isInteger(value)) return value
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits,
    }).format(value)
}
