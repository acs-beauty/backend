const ORDER_STATUS = Object.freeze({
  OPEN: "open",
  PENDING: "pending",
  PAID: "paid",
  DELIVERING: "delivering",
  CONFIRMED: "confirmed",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
  REOPENED: "reopened",
});

module.exports = ORDER_STATUS;
