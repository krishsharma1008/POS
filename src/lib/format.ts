export function formatRupiah(amount: number): string {
  if (amount === 0) return "Rp. 0";
  return (
    "Rp. " +
    amount.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}

export function formatPercent(value: number): string {
  return value.toFixed(2) + "%";
}
