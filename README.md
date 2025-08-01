# Real-Time Chat Application

A modern real-time chat application built with React.js, Node.js, Express, and Socket.io. Users can join different chat rooms and communicate with each other in real-time.

## Features

- ✨ Real-time messaging with Socket.io
- 🏠 Multiple chat rooms support
- 👥 User management and online users display
- 📱 Responsive design
- 🎨 Modern and clean UI
- 🚀 Easy deployment ready

## Technology Stack

### Frontend
- React.js
- Socket.io Client
- React Router DOM
- CSS3

### Backend
- Node.js
- Express.js
- Socket.io
- CORS

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the server** (from the server directory)
   ```bash
   cd server
   npm start
   ```
   The server will start on `http://localhost:5000`

2. **Start the client** (from the client directory, in a new terminal)
   ```bash
   cd client
   npm start
   ```
   The client will start on `http://localhost:3000`

3. **Open your browser**
   Navigate to `http://localhost:3000` to access the chat application

### Usage

1. Enter your name and desired room name on the join page
2. Click "Sign In" to enter the chat room
3. Start chatting with other users in real-time!
4. You can see who else is online in the room in the sidebar

## Project Structure

```
├── client/                 # React frontend
│   ├── public/            # Public assets
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Chat/      # Main chat interface
│   │   │   ├── Join/      # Room join interface
│   │   │   ├── Messages/  # Message display
│   │   │   ├── Input/     # Message input
│   │   │   ├── InfoBar/   # Room information
│   │   │   └── TextContainer/ # User list
│   │   ├── App.js         # Main app component
│   │   └── index.js       # App entry point
│   └── package.json
├── server/                # Node.js backend
│   ├── index.js          # Server entry point
│   ├── router.js         # API routes
│   ├── users.js          # User management
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /` - Health check endpoint

## Socket Events

### Client to Server
- `join` - Join a chat room
- `sendMessage` - Send a message to the room
- `disconnect` - Leave the room

### Server to Client
- `message` - Receive a message
- `roomData` - Receive room information and user list

## Deployment

The application is configured for easy deployment to platforms like Heroku, Netlify, or Vercel.

### Environment Variables
- `NODE_ENV` - Set to 'production' for production deployment
- `PORT` - Server port (defaults to 5000)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
