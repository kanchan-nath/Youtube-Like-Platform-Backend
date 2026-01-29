# YouTube Like Platform Backend ONGOING

A production-grade backend system for video streaming and content management.

## Overview

The backend system provides a comprehensive API for managing video content, user authentication, streaming capabilities, and engagement features. The system handles video transcoding to multiple resolutions, asynchronous processing through job queues, real-time notifications via email, and secure user management with JWT authentication.

## Technology Stack

- Runtime: Node.js
- Framework: Express
- Database: MongoDB (via Mongoose)
- Cache: Redis
- Storage: Cloudinary
- Message Queue: Bull (Redis-backed job queue)
- Video Processing: FFmpeg
- Authentication: JWT with refresh tokens
- Email: Nodemailer
- Utilities: bcryptjs for password hashing, ua-parser-js for device detection

## Folder Structure

```
src/
├── config/
│   ├── welcome.config.js           # Welcome email template configuration
│   └── welcomeLogin.config.js      # Login notification email configuration
├── controllers/
│   ├── user_controller.js          # User authentication and profile management
│   ├── video_controller.js         # Video upload and management
│   ├── comment_controller.js       # Comment operations
│   ├── like_controller.js          # Like/unlike functionality
│   ├── playlist_controller.js      # Playlist management
│   └── plan_controller.js          # Subscription plan management
├── db/
│   └── index.js                    # MongoDB connection setup
├── middlewares/
│   ├── auth.middleware.js          # JWT verification middleware
│   ├── multer.middleware.js        # File upload handling
│   ├── email.middleware.js         # OTP and email operations
│   ├── deviceInformation.middleware.js # Device tracking
│   └── rateLimiter.middleware.js   # Request rate limiting
├── models/
│   ├── user_model.js               # User schema with authentication methods
│   ├── video_model.js              # Video metadata and URL storage
│   ├── comment_model.js            # Comment schema
│   ├── like_model.js               # Like tracking across content types
│   ├── playlist_model.js           # Playlist creation and management
│   ├── plan_model.js               # Subscription plan schema
│   ├── liveStream_model.js         # Live streaming configuration
│   ├── liveStreamChat_model.js     # Live stream chat messages
│   ├── liveStreamViewer_model.js   # Live stream viewer tracking
│   ├── subscription_model.js       # Channel subscription schema
│   ├── chat_model.js               # Direct messaging
│   ├── community_model.js          # Community posts
│   └── emailOtpVerification_model.js # OTP storage and verification
├── queues/
│   ├── video.queue.js              # Bull queue configuration for video processing
│   └── video.worker.js             # Video transcoding and optimization worker
├── routes/
│   ├── user.route.js               # User authentication endpoints
│   ├── emailOTP.route.js           # OTP verification endpoints
│   ├── video.route.js              # Video management endpoints
│   ├── comment.route.js            # Comment endpoints
│   ├── like.route.js               # Like toggle endpoints
│   ├── playlist.route.js           # Playlist endpoints
│   └── plan.route.js               # Plan selection endpoints
├── utils/
│   ├── ApiResponse.js              # Standard API response formatter
│   ├── ApiError.js                 # Custom error handler
│   ├── asyncHandeler.js            # Async error wrapper
│   ├── cloudinary.js               # Cloudinary upload configuration
│   └── redis.js                    # Redis connection setup
├── app.js                          # Express app configuration
├── index.js                        # Server entry point
├── constant.js                     # Database constants
└── redisClient.js                  # Redis client initialization

.env.example                        # Environment variables template
package.json                        # Project dependencies
```

## Installation

### Prerequisites

- Node.js 16.0.0 or higher
- MongoDB 4.4 or higher (local or MongoDB Atlas)
- Redis 6.0 or higher
- FFmpeg installed on system
- Cloudinary account with API credentials
- Gmail account with app-specific password

### Setup Instructions

```bash
# Clone repository
git clone https://github.com/<your-username>/<repository-name>.git

# Move into project directory
cd <repository-name>

# Add upstream remote
git remote add upstream https://github.com/<original-owner>/<repository-name>.git

# Install dependencies
npm install
```

## Environment Configuration

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update `.env` with the following variables:

```
# Server
PORT=8000
CORS_ORIGIN=http://localhost:3000

# Database
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/

# Redis
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Cloudinary (media storage)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Authentication
ACCESS_TOKEN_SECRET=your_secret_access_token_key
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_secret_refresh_token_key
REFRESH_TOKEN_EXPIRY=15d
SALT_ROUND=10

# Email Service (Gmail SMTP)
AUTH_EMAIL=your-email@gmail.com
AUTH_PASS=your-app-specific-password
AUTH_SERVICE=gmail
SERVER_HOST=smtp.gmail.com
```

## Database Setup

MongoDB must be running locally or configured via MongoDB Atlas. Ensure the connection string in `.env` is correct.

For local MongoDB:

```bash
mongodb
```

## Start Server

Run the development server:

```bash
npm run dev
```

The server runs on the port specified in `.env` (default: 8000).

## Configuration

All configuration is managed through environment variables in the `.env` file. The system uses:

- JWT for stateless authentication
- Redis for caching and session management
- Bull queue for asynchronous video transcoding
- Nodemailer for email notifications
- Cloudinary for media storage and CDN delivery

## API Routes

| Method | Endpoint | Description | Authentication | Request Body | Response |
| --- | --- | --- | --- | --- | --- |
| POST | `/api/v1/auth/register` | Register new user | No | avatar, coverImage, userName, email, fullName, password, age | User object with token |
| POST | `/api/v1/auth/login` | Login user | Device Info | email/userName, password | Access token, refresh token |
| POST | `/api/v1/auth/logout` | Logout user | JWT | None | Success message |
| POST | `/api/v1/auth/refresh-token` | Refresh access token | No | refresh token | New access token |
| POST | `/api/v1/auth/reset-password` | Reset user password | JWT | oldPassword, newPassword, repeatNewPassword | Success message |
| GET | `/api/v1/auth/get-user-profile` | Get user profile | JWT | None | User profile object |
| PATCH | `/api/v1/auth/update-user-profile` | Update user profile | JWT | userName, email, fullName, age | Updated user object |
| PATCH | `/api/v1/auth/update-user-profile-files` | Update avatar/cover image | JWT | avatar, coverImage files | Updated user object |
| DELETE | `/api/v1/auth/delete` | Delete user account | JWT | None | Success message |
| POST | `/api/v1/auth/send-otp` | Send OTP to email | No | email | OTP sent message |
| POST | `/api/v1/auth/verify-otp` | Verify OTP | No | email, OTPFromUser | Verification success |
| POST | `/api/v1/auth/resend-otp` | Resend OTP | No | email | OTP resent message |
| POST | `/api/v1/video/upload` | Upload video | JWT | videoFile, thumbnail, title, videoDescription, tag, genre | Video object with ID |
| DELETE | `/api/v1/video/delete/:videoId` | Delete video | JWT | None | Success message |
| GET | `/api/v1/video/get-videos` | Get all videos | JWT | None | Array of videos |
| GET | `/api/v1/video/videos/:videoId` | Get video details | JWT | None | Video object |
| PATCH | `/api/v1/video/update` | Update video details | JWT | title, videoDescription, tag, genre, videoId | Updated video object |
| POST | `/api/v1/comments/:videoId` | Create comment | JWT | commentContent, videoId | Comment object |
| GET | `/api/v1/comments/video/:videoId` | Get video comments | JWT | None | Array of comments |
| PATCH | `/api/v1/comments/:commentId` | Update comment | JWT | commentContent | Updated comment object |
| DELETE | `/api/v1/comments/:commentId` | Delete comment | JWT | None | Success message |
| POST | `/api/v1/likes/video/:videoId` | Toggle like on video | JWT | None | Like status |
| POST | `/api/v1/likes/comment/:commentId` | Toggle like on comment | JWT | None | Like status |
| POST | `/api/v1/playlists/create` | Create playlist | JWT | playlistName, playlistDescription, playlistCoverImage | Playlist object |
| POST | `/api/v1/playlists/:playlistId/add-video/:videoId` | Add video to playlist | JWT | None | Updated playlist |
| GET | `/api/v1/playlists/get-playlist` | Get user playlists | JWT | None | Array of playlists |
| GET | `/api/v1/playlists/:playlistId` | Get playlist details | JWT | None | Playlist object |
| DELETE | `/api/v1/playlists/:playlistId/remove/:videoId` | Remove video from playlist | JWT | None | Updated playlist |
| DELETE | `/api/v1/playlists/:playlistId` | Delete playlist | JWT | None | Success message |
| POST | `/api/v1/plans/select-plan` | Select subscription plan | JWT | planName, planPrice | Plan selection response |

## Authentication

- Type: JWT (JSON Web Tokens)
- Token Expiration: 1 day (configurable via ACCESS_TOKEN_EXPIRY)
- Refresh Token: 15 days (configurable via REFRESH_TOKEN_EXPIRY)
- Required Headers: `Authorization: Bearer <accessToken>`
- Password Hashing: bcryptjs with salt rounds configured via SALT_ROUND

## Error Handling

HTTP Status Codes:

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow standard format:
```json
{
  "statusCode": 400,
  "message": "Error description",
  "success": false,
  "errors": []
}
```

## Database Schema

### Key Tables

- **users** - User profile, authentication credentials, watch history, and subscription preferences
- **videos** - Video metadata, transcoded URL variants, duration, view count, and publication status
- **comments** - Video comments with threading support via parentId field
- **likes** - Like tracking across videos, comments, chats, and playlists
- **playlists** - User-created video collections with metadata and cover images
- **liveStreams** - Live streaming configuration with stream keys and viewer tracking
- **liveStreamChat** - Real-time chat messages during live streams with pin functionality
- **liveStreamViewer** - Viewer join/leave timestamps for analytics
- **subscriptions** - Channel subscription relationships between users
- **plans** - Subscription tier definitions with pricing and features
- **emailOtpVerification** - OTP storage for email verification with expiration

## Caching Strategy

- Redis caching layer for frequently accessed user profiles and video metadata
- Session management through Redis for active user tracking
- OTP cache with automatic expiration for email verification
- Bull queue for asynchronous video transcoding jobs with progress tracking

## Video Processing

Videos uploaded through `/api/v1/video/upload` are queued for background transcoding. The system automatically generates multiple resolution variants (240p, 360p, 480p, 720p, 1080p) using FFmpeg and uploads them to Cloudinary. Original video metadata is updated with transcoded URLs and duration information.

## Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Generate coverage report
npm run test:coverage
```

## Deployment

- Configure environment variables for production deployment
- Ensure MongoDB and Redis are running or cloud-hosted
- Set up Cloudinary and email service credentials
- Configure CORS origin to match frontend domain
- Enable helmet middleware for security headers
- Set NODE_ENV=production for optimization
- Use process manager (PM2) for Node.js process management

## Performance Considerations

- Database indexing on frequently queried fields (userName, email, videoId)
- Pagination implemented for video and comment listings
- Compression middleware enabled for response optimization
- Redis caching for reduce database queries
- Asynchronous video processing to prevent blocking requests
- Connection pooling for database connections
- Rate limiting to prevent abuse and DDoS attacks

## Security

- Password hashing with bcryptjs before database storage
- JWT tokens with expiration and refresh mechanism
- CORS configuration to restrict cross-origin requests
- Rate limiting on authentication endpoints
- OTP-based email verification for new user accounts
- Device tracking and suspicious login alerts via email
- Input validation and sanitization on all endpoints
- Helmet middleware for HTTP header security
- Environment variables for sensitive credentials

## Monitoring and Logging

- Logging framework: Console-based (can be extended with Winston or Bunyan)
- Error tracking: Custom ApiError class for standardized error handling
- Performance monitoring: Bull queue job completion tracking
- Alert thresholds: Email notifications for suspicious login attempts
- Log retention: Database records for audit trails

## API Rate Limits

| Tier | Limit |
| --- | --- |
| Standard | 100 requests per 15 minutes |
| Premium | Custom limit based on plan |
| Admin | Unlimited |

## Dependencies

- bcryptjs: ^3.0.3
- bull: ^4.16.5
- cloudinary: ^2.8.0
- compression: ^1.8.1
- cookie-parser: ^1.4.7
- cors: ^2.8.5
- dotenv: ^17.2.3
- express: ^5.2.1
- express-rate-limit: ^8.2.1
- fluent-ffmpeg: ^2.1.3
- helmet: ^8.1.0
- ioredis: ^5.9.1
- jsonwebtoken: ^9.0.3
- mongoose: ^9.1.2
- multer: ^2.0.2
- nodemailer: ^7.0.12
- redis: ^5.10.0
- ua-parser-js: ^2.0.8

## Contributing

- Code style: Follow consistent naming conventions (camelCase for variables, PascalCase for classes)
- Commit format: Use descriptive messages with prefix (feat:, fix:, docs:, refactor:)
- Pull request process: Create branch from develop, submit PR with test coverage
- Review requirements: Minimum one approval before merge, all tests must pass

## Troubleshooting

### Common Issues

| Issue | Solution |
| --- | --- |
| MongoDB connection failed | Verify MONGODB_URI in .env file and ensure MongoDB service is running |
| Redis connection error | Check Redis is running on configured host and port (default: localhost:6379) |
| Cloudinary upload fails | Verify API credentials and ensure account has sufficient storage quota |
| Email verification not received | Check AUTH_EMAIL and AUTH_PASS are correct, enable Less Secure Apps for Gmail |
| Video transcoding hangs | Ensure FFmpeg is installed and accessible in system PATH |
| JWT token invalid | Verify ACCESS_TOKEN_SECRET is set correctly and token has not expired |

## Support and Contact

- Issue Tracker: GitHub Issues
- Documentation: API documentation available in routes folder
- Email: Support via registered email service

## License

ISC
