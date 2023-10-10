function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName: firstName,
      familyName: familyName,
      title: title,
      payPerHour: payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }

  function createEmployeeRecords(employeeData) {
    return employeeData.map(employee => createEmployeeRecord(employee));
  }

  function createTimeInEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const timeInEvent = {
      type: "TimeIn",
      hour: parseInt(time, 10),
      date: date
    };
    employee.timeInEvents.push(timeInEvent);
    return employee;
  }

  function createTimeOutEvent(employee, dateStamp) {
    const [date, time] = dateStamp.split(" ");
    const timeOutEvent = {
      type: "TimeOut",
      hour: parseInt(time, 10),
      date: date
    };
    employee.timeOutEvents.push(timeOutEvent);
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeInEvent = employee.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
      return hoursWorked;
    }
  
    return 0; // Return 0 if no work hours were captured.
  }
  

  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    const payOwed = hoursWorked * employee.payPerHour;
    return payOwed;
  }
  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const totalPay = datesWorked.reduce((acc, date) => {
      return acc + wagesEarnedOnDate(employee, date);
    }, 0);
    return totalPay;
  }
  
  function calculatePayroll(employees) {
    const totalPayroll = employees.reduce((acc, employee) => {
      const datesWorked = employee.timeInEvents.map(event => event.date);
      const payForEmployee = datesWorked.reduce((employeeAcc, date) => {
        return employeeAcc + wagesEarnedOnDate(employee, date);
      }, 0);
      return acc + payForEmployee;
    }, 0);
    return totalPayroll;
  }
  
