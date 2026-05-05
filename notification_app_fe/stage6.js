const fetch = require("node-fetch");

const API_URL = "http://20.207.122.201/evaluation-service/notifications";

const priorityMap = {
  Placement: 3,
  Result: 2,
  Event: 1
};

async function getTopNotifications() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    let notifications = data.notifications;

    // Sort by priority first, then by timestamp
    notifications.sort((a, b) => {
      if (priorityMap[b.Type] !== priorityMap[a.Type]) {
        return priorityMap[b.Type] - priorityMap[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    // Get top 10
    const top10 = notifications.slice(0, 10);

    console.log("Top 10 Notifications:");
    console.log(top10);

  } catch (error) {
    console.error("Error:", error);
  }
}

getTopNotifications();
