export default function thousandFormate(x) {
  const num = Math.floor(x);
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
