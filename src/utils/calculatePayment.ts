const calculatePaymentPlan = (sale: any) => {
  const { totalPrice, portion } = sale;
  const installmentPrice = totalPrice / portion;

  const today = new Date();
  const dueDates = [];
  for (let i = 0; i < portion; i++) {
    const dueDate = new Date(today);
    dueDate.setMonth(today.getMonth() + i);

    const day = dueDate.getDate();
    const month = dueDate.getMonth() + 1;
    const year = dueDate.getFullYear();

    const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;

    dueDates.push(formattedDate);
  }

  return {
    totalPrice,
    portion,
    installmentPrice: parseFloat(installmentPrice.toFixed(2)),
    dueDates,
  };
};

export { calculatePaymentPlan };
