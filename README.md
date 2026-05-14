# Chat App

A simple real-time chat app built with a Next.js frontend and a Node.js WebSocket backend.

## Project Structure

```text
chat_app/
├── next_logic/        # Next.js frontend
├── websocket_logic/   # WebSocket server
├── Dockerfile         # Production container build
└── package.json       # Root dev script
```

## Requirements

- Node.js 22 or newer
- npm
- Docker, optional

## Local Development

Install dependencies for each part of the app:

```bash
npm install
npm install --prefix next_logic
npm install --prefix websocket_logic
```

Start both the frontend and websocket backend from the project root:

```bash
npm run dev
```

Open the app at:

```text
http://localhost:3000
```

The websocket server runs on:

```text
ws://localhost:8080
```

## How It Works

- Create Room generates a room id and connects to the websocket server.
- Join Room lets another user enter the same room id.
- Messages are sent to the websocket server and broadcast to clients in the same room.

## Docker

Build the image:

```bash
docker build -t chat-app .
```

Run the container:

```bash
docker run --rm -p 3000:3000 -p 8080:8080 chat-app
```

Then open:

```text
http://localhost:3000
```

## Notes

- Do not commit `node_modules` or build output folders.
- The frontend expects the websocket server to be available on port `8080`.
- The Docker build may need internet access because the Next.js app uses `next/font/google`.
