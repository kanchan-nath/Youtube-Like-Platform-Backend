# 🎥 YouTube-Like Platform API Routes

## 🔐 Authentication & Users

### Authentication
- **POST** `/api/v1/auth/register` - Register new user
- **POST** `/api/auth/login` - User login
- **POST** `/api/auth/logout` - User logout
- **GET** `/api/auth/me` - Get current user

### User Management
- **GET** `/api/users/:id` - Get user profile
- **PUT** `/api/users/:id` - Update user profile
- **DELETE** `/api/users/:id` - Delete user account

---

## 📹 Videos

### Video CRUD
- **POST** `/api/videos` - Upload video
- **GET** `/api/videos` - Get all videos (with pagination, filters)
- **GET** `/api/videos/:id` - Get single video
- **PUT** `/api/videos/:id` - Update video details
- **DELETE** `/api/videos/:id` - Delete video

### Video Discovery
- **GET** `/api/videos/trending` - Get trending videos
- **GET** `/api/videos/user/:userId` - Get user's videos
- **PATCH** `/api/videos/:id/view` - Increment view count

---

## 💬 Comments

### Comment Operations
- **POST** `/api/videos/:videoId/comments` - Add comment
- **GET** `/api/videos/:videoId/comments` - Get video comments
- **PUT** `/api/comments/:id` - Update comment
- **DELETE** `/api/comments/:id` - Delete comment
- **POST** `/api/comments/:id/reply` - Reply to comment

---

## 👍 Likes & Dislikes

### Video Reactions
- **POST** `/api/videos/:id/like` - Like video
- **POST** `/api/videos/:id/dislike` - Dislike video
- **DELETE** `/api/videos/:id/like` - Remove like

### Comment Reactions
- **POST** `/api/comments/:id/like` - Like comment
- **DELETE** `/api/comments/:id/like` - Remove like

---

## 🔔 Subscriptions

### Subscription Management
- **POST** `/api/users/:id/subscribe` - Subscribe to channel
- **DELETE** `/api/users/:id/subscribe` - Unsubscribe from channel
- **GET** `/api/users/:id/subscribers` - Get channel subscribers
- **GET** `/api/users/:id/subscriptions` - Get user's subscriptions

---

## 📚 Playlists

### Playlist CRUD
- **POST** `/api/playlists` - Create playlist
- **GET** `/api/playlists/:id` - Get playlist
- **PUT** `/api/playlists/:id` - Update playlist
- **DELETE** `/api/playlists/:id` - Delete playlist

### Playlist Items
- **POST** `/api/playlists/:id/videos` - Add video to playlist
- **DELETE** `/api/playlists/:id/videos/:videoId` - Remove video from playlist
- **GET** `/api/users/:id/playlists` - Get user's playlists

---

## 🔍 Search

### Search Operations
- **GET** `/api/search?q=query` - Search videos
- **GET** `/api/search/videos?q=query` - Search videos only
- **GET** `/api/search/channels?q=query` - Search channels only

---

## 🔔 Notifications

### Notification Management
- **GET** `/api/notifications` - Get user notifications
- **PATCH** `/api/notifications/:id/read` - Mark notification as read
- **PATCH** `/api/notifications/read-all` - Mark all as read
- **DELETE** `/api/notifications/:id` - Delete notification

---

## 📊 Analytics (Optional)

### Video Analytics
- **GET** `/api/analytics/videos/:id` - Get video analytics
- **GET** `/api/analytics/channel/:id` - Get channel analytics

---

## ⚙️ Admin (Optional)

### Admin Operations
- **GET** `/api/admin/users` - Get all users
- **DELETE** `/api/admin/videos/:id` - Remove video (admin)
- **PATCH** `/api/admin/users/:id/ban` - Ban user