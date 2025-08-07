# CricDar Backend API

A comprehensive REST API for the CricDar cricket application, built with Node.js, Express.js, and MongoDB.

## 🚀 Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **Cricket Data Management**: Complete CRUD operations for matches, players, and series
- **External API Integration**: Seamless integration with Cricbuzz API for live data
- **Data Synchronization**: Automated sync of matches and players from external APIs
- **Search Functionality**: Advanced search across matches and players
- **Rate Limiting**: Built-in rate limiting for API protection
- **Error Handling**: Comprehensive error handling and logging
- **Validation**: Request validation using express-validator
- **Security**: Helmet.js for security headers, CORS configuration

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v5 or higher)
- Redis (optional, for caching)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/cricdar
   JWT_SECRET=your-super-secret-jwt-key-here
   CRICBUZZ_API_KEY=your-cricbuzz-api-key
   CRICBUZZ_API_HOST=cricbuzz-cricket.p.rapidapi.com
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### POST `/api/auth/login`
Login user
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### GET `/api/auth/me`
Get current user profile (requires authentication)

#### PUT `/api/auth/profile`
Update user profile (requires authentication)

#### PUT `/api/auth/password`
Change password (requires authentication)

### Matches Endpoints

#### GET `/api/matches`
Get all matches with filtering and pagination
```
Query Parameters:
- status: upcoming, live, completed, cancelled, postponed
- matchType: test, odi, t20, t20i, first-class, list-a
- team: team name
- venue: venue name
- page: page number
- limit: items per page
- sort: sort field
- featured: boolean
```

#### GET `/api/matches/live`
Get live matches

#### GET `/api/matches/upcoming`
Get upcoming matches

#### GET `/api/matches/:matchId`
Get match by ID

#### POST `/api/matches`
Create a new match (requires moderator/admin)

#### PUT `/api/matches/:matchId`
Update match (requires moderator/admin)

#### DELETE `/api/matches/:matchId`
Delete match (requires admin)

### Players Endpoints

#### GET `/api/players`
Get all players with filtering and pagination
```
Query Parameters:
- role: Batsman, Bowler, All-rounder, Wicket-keeper
- team: team name
- country: country name
- page: page number
- limit: items per page
- sort: sort field
- active: boolean
```

#### GET `/api/players/active`
Get active players

#### GET `/api/players/top-batsmen`
Get top batsmen by format

#### GET `/api/players/top-bowlers`
Get top bowlers by format

#### GET `/api/players/:playerId`
Get player by ID

#### POST `/api/players`
Create a new player (requires moderator/admin)

#### PUT `/api/players/:playerId`
Update player (requires moderator/admin)

#### DELETE `/api/players/:playerId`
Delete player (requires admin)

### External API Endpoints

#### GET `/api/cricket/live-matches`
Get live matches from Cricbuzz API

#### GET `/api/cricket/upcoming-matches`
Get upcoming matches from Cricbuzz API

#### GET `/api/cricket/match/:matchId`
Get match details from Cricbuzz API

#### GET `/api/cricket/match/:matchId/scorecard`
Get match scorecard from Cricbuzz API

#### GET `/api/cricket/player/:playerId`
Get player details from Cricbuzz API

#### POST `/api/cricket/sync-matches`
Sync matches from Cricbuzz API to database (requires admin)

#### POST `/api/cricket/sync-players`
Sync players from Cricbuzz API to database (requires admin)

#### GET `/api/cricket/search`
Search matches and players
```
Query Parameters:
- q: search query (required)
- type: matches, players, all
- limit: number of results
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles

- **user**: Regular user with basic access
- **moderator**: Can create/update matches and players
- **admin**: Full access to all endpoints

## 📊 Database Models

### User Model
- Authentication fields (username, email, password)
- Profile information (firstName, lastName, bio, etc.)
- Role-based access control
- Account security (login attempts, lockout)

### Match Model
- Match details (name, type, status, venue)
- Teams and scores
- Commentary and highlights
- External API integration

### Player Model
- Player information (name, role, stats)
- Rankings and achievements
- Team associations
- Recent form tracking

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment | development |
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/cricdar |
| `JWT_SECRET` | JWT signing secret | - |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d |
| `CRICBUZZ_API_KEY` | Cricbuzz API key | - |
| `CRICBUZZ_API_HOST` | Cricbuzz API host | cricbuzz-cricket.p.rapidapi.com |
| `REDIS_URL` | Redis connection string | - |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | 900000 (15 min) |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 |

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Docker
```bash
docker build -t cricdar-backend .
docker run -p 5000:5000 cricdar-backend
```

## 🧪 Testing

```bash
npm test
```

## 📝 API Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "errors": [
    // Validation errors
  ]
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for password security
- **Rate Limiting**: Protection against abuse
- **Input Validation**: Request validation and sanitization
- **CORS Configuration**: Cross-origin resource sharing
- **Security Headers**: Helmet.js for security headers
- **Account Lockout**: Brute force protection

## 📈 Performance Features

- **Database Indexing**: Optimized queries with proper indexes
- **Pagination**: Efficient data pagination
- **Caching**: Redis integration for caching (optional)
- **Compression**: Response compression with gzip
- **Logging**: Comprehensive request logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please open an issue in the repository. 