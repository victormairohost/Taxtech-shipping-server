const todayDate = new Date();

// back track todayDate to 2 day
todayDate.setDate(todayDate.getDate() - 1);

console.log(todayDate);
