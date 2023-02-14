exports.sjf = (processes) => {
  processes.forEach((process) => {
    process.arrivalTime = parseInt(process.arrivalTime);
    process.burstTime = parseInt(process.burstTime);
    process.isCompleted = false;
  });
  processes.sort((p1, p2) =>
    p1.arrivalTime > p2.arrivalTime
      ? 1
      : p1.arrivalTime < p2.arrivalTime
      ? -1
      : 0
  );
  // console.log("Before", processes);
  let currentTime = processes[0].arrivalTime;
  for (let i = 0; i < processes.length; i++) {
    // console.log(currentTime);

    let availableJobs = processes.filter(
      (process) =>
        process.arrivalTime <= currentTime && process.isCompleted == false
    );
    let shortestJob = availableJobs.reduce(function (prev, curr) {
      return prev.burstTime < curr.burstTime ? prev : curr;
    });

    shortestJob.waitingTime = currentTime - shortestJob.arrivalTime;
    shortestJob.responseTime = shortestJob.waitingTime;
    currentTime += shortestJob.burstTime;
    shortestJob.completionTime = currentTime;
    shortestJob.turnAroundTime =
      shortestJob.completionTime - shortestJob.arrivalTime;
    shortestJob.isCompleted = true;

    processes[processes.indexOf((process) => process.pid == shortestJob.pid)] =
      shortestJob;
  }

  // console.log(processes);
  return processes;
};
