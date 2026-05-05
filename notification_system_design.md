# Stage 2 - Database Design

# I am using MongoDB because it is flexible and structural for large notification data

1.
Collection: notifications

{
"_id": "ObjectId",
"userId": "string",
"title": "string",
"message": "string",
"createdAt": "timestamp"
}

2.
db.notifications.insertOne({
userId: "123",
title: "New Message",
message: "You have a new message",
type: "INFO",
isRead: false,
createdAt: new Date()
})

3.
db.notifications.find({ userId: "123" }).sort({ createdAt: -1 })

db.notifications.updateOne(
{ _id: ObjectId("n1") },
{ $set: { isRead: true } }
)

4.
db.notifications.deleteOne({ _id: ObjectId("n1") })


5. Problems with Scaling

1. Large data volume
2. Slow queries
3. High read/write load

6. Solutions

* Use indexing on userId
* Use sharding (distribute data)
* Use caching (Redis)
* Archive old notifications
