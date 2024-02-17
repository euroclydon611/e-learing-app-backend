import { Document, Model } from "mongoose";

interface MonthData {
  month: string;
  count: number;
}

//============= THIS GIVES ANALYTICS FOR THE WHOLE MONTHS =============
export async function generateLast12MonthData<T extends Document>(
  model: Model<T>
): Promise<{ last12Months: MonthData[] }> {
  const last12Months: MonthData[] = [];
  const currentDate = new Date();

  // Loop through the last 12 months
  for (let i = 0; i < 12; i++) {
    // Calculate the start date for the current month
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i,
      1
    );
    // Calculate the end date for the current month
    const endDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - i + 1,
      0
    );
    // Format the month-year string
    const monthYear = endDate.toLocaleString("default", {
      //   day: "numeric",
      month: "short",
      year: "numeric",
    });
    // Query the database for documents within the current month
    const count = await model.countDocuments({
      createdAt: { $gte: startDate, $lt: endDate },
    });
    // Push the month data to the array
    last12Months.push({ month: monthYear, count });
  }
  // Reverse the array to have the months in ascending order
  //   last12Months.reverse();
  // Return the result
  return { last12Months };
}

//============= THIS GIVES ANALYTICS FOR THE LAST 28 DAYS =============
// export async function generateLast12MonthData<T extends Document>(
//   model: Model<T>
// ): Promise<{ last12Months: MonthData[] }> {
//   const last12Months: MonthData[] = [];
//   const currentDate = new Date();

//   // Loop through the last 12 months
//   for (let i = 0; i < 12; i++) {
//     // Calculate the end date as the current date minus the current iteration multiplied by 28 days
//     const endDate = new Date(
//       currentDate.getTime() - i * 28 * 24 * 60 * 60 * 1000
//     );
//     // Calculate the start date as 28 days before the end date
//     const startDate = new Date(endDate.getTime() - 28 * 24 * 60 * 60 * 1000);
//     // Format the month-year string
//     const monthYear = endDate.toLocaleString("default", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//     // Query the database for documents within the current 28-day period
//     const count = await model.countDocuments({
//       createdAt: { $gte: startDate, $lt: endDate },
//     });
//     // Push the month data to the array
//     last12Months.push({ month: monthYear, count });
//   }
//   // Return the result
//   return { last12Months };
// }
