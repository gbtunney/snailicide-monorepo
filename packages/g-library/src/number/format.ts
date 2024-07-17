//todo:: number format options
export const formatCurrency = (
    value: number,
    minimumFractionDigits: number = 2,
    currency: string = 'USD',
): string => {
    // if (!isInteger(value)) return value
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits,
    }).format(value)
}
