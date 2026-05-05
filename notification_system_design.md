# Stage 2 - Database Design

# I am using MongoDB because it is flexible and structural for large notification data

# 1.
Collection: notifications

{
"_id": "ObjectId",
"userId": "string",
"title": "string",
"message": "string",
"createdAt": "timestamp"
}

# 2.
db.notifications.insertOne({
userId: "123",
title: "New Message",
message: "You have a new message",
type: "INFO",
isRead: false,
createdAt: new Date()
})

# 3.
db.notifications.find({ userId: "123" }).sort({ createdAt: -1 })

db.notifications.updateOne(
{ _id: ObjectId("n1") },
{ $set: { isRead: true } }
)

# 4.
db.notifications.deleteOne({ _id: ObjectId("n1") })


# 5. Problems with Scaling

1. Large data volume
2. Slow queries
3. High read/write load

# 6. Solutions

* Use indexing on userId
* Use sharding (distribute data)
* Use caching (Redis)
* Archive old notifications

# Stage 3 - Query Optimization

## 1. Given Query

SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt ASC;

## 2. Is this query accurate?

Yes, the query is correct because:

* It fetches unread notifications
* Filters by studentID
* Sorts by creation time

## 3. Why is this slow?

* Large dataset (millions of records)
* No proper indexing
* Full table scan may occur
* Sorting (ORDER BY) is expensive

Time Complexity:
O(n log n) without indexing

## 4. What should be improved?

### Use Indexing

Create a **composite index**:

CREATE INDEX idx_notifications
ON notifications(studentID, isRead, createdAt);

# This helps:

* Fast filtering (studentID, isRead)
* Faster sorting (createdAt)

## 5. Should we add index on every column?
No

Reasons:
* Slows down write operations (INSERT/UPDATE)
* Not all queries use all columns

## 6. Optimized Query

SELECT id, title, message, createdAt
FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt ASC;


## 7. Query for Placement Notifications (last 7 days)

SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL 7 DAY;

## 8. Additional Improvements

* Archive old data
* Use caching (Redis)

# Stage 4 - Performance Optimization

# 1. Problem

* Notifications are fetched on every page
* Database is overloaded
* Slow response time for the users

# 2. Solutions

# 1. Caching (Redis)

* Store user notifications in Redis
* On request:

  * First check cache
  * If not present then fetch from DB then store in cache.

Faster response will generate

# 2. Pagination

Instead of fetching all notifications:

SELECT * FROM notifications
WHERE studentID = 1042
ORDER BY createdAt DESC
LIMIT 10 OFFSET 0;

Reduces DB load
User needs multiple requests

# 3. Infinite Scroll

* Load notifications in chunks (10–20 at a time)
* Load more when user scrolls

Better UX
Slight frontend complexity

# 4. WebSockets (Real-Time)

* Push only new notifications
* Avoid fetching again and again

Real-time updates

# 5. Database Indexing

* Index on (studentID, createdAt)


# 6. Archiving Old Data

* Move old notifications to archive table

* Keeps main table small
* Extra complexity
