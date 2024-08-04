//todo:: number format options
export const formatCurrency = (
    value: number,
    minimumFractionDigits: number = 2,
    currency: string = 'USD',
): string => {
    // if (!isInteger(value)) return value
    return new Intl.NumberFormat('en-US', {
        currency,
        minimumFractionDigits,
        style: 'currency',
    }).format(value)
}
