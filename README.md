# Learning Management System (LMS)

## Overview

The LMS project is a feature-rich platform designed to enhance the teaching and learning experience in web programming. It combines interactivity, collaboration, and real-time tools to create a seamless environment for educators and learners.

## Features

### 1. Course Management

-   Create and manage courses with chapters, resources, and videos.
-   HLS video streaming via MUX for optimized playback.
-   Rich text editor for course content creation using Quill.

### 2. Forum Chat

-   Real-time chat with rich text editor support.
-   Create workspaces and channels for discussions.
-   Video conferencing, screen sharing, and thread-based replies using LiveKit.
-   Powered by Convex Database for low-latency real-time synchronization.

### 3. Task Manager

-   Manage tasks using Kanban boards, calendars, and tables.
-   Drag-and-drop functionality powered by Dnd Kit for intuitive task organization.

### 4. Live Coding

-   Support for live coding sessions via LiveKit Ingress Service.
-   Stream using RTMP or WHIP protocols from OBS for enhanced coding demonstrations.

### 5. Whiteboard Collaboration

-   Real-time collaborative drawing using Liveblocks and Yjs.
-   Export boards as SVG, PNG, or JSON, and synchronize complex canvas elements seamlessly.

### 6. Coding Editor

-   Multi-language support (e.g., Python, Java, JS) using Piston.
-   Code formatting, syntax highlighting, and sharing in a secure isolated environment.

### 7. Analytics

-   Revenue statistics and course performance tracking.

## Technologies Used

### Frontend

-   **Next.js**: For building responsive web applications.
-   **React**: Component-based UI library.

### Backend

-   **Node.js**: Backend runtime for handling APIs.
-   **Prisma**: ORM for database interactions.
-   **PostgreSQL/MongoDB**: Database for storing application data.

### Infrastructure

-   **Load Balancer**: Ensures high availability and even traffic distribution.
-   **Redis**: For caching frequently accessed data.
-   **RabbitMQ/Kafka**: Message broker for asynchronous communication.
-   **Prometheus & Grafana**: For monitoring and logging.

### External Services

-   **MUX API**: For HLS video processing and streaming.
-   **Quill**: For rich text editing in course management.
-   **LiveKit**: For video conferencing, screen sharing, and online collaboration.
-   **Convex Database**: For real-time data synchronization in forum chat and whiteboard.
-   **Dnd Kit**: For modern drag-and-drop task management.
-   **Liveblocks**: For real-time whiteboard collaboration.
-   **Yjs**: For seamless synchronization of whiteboard canvas states.
-   **Piston**: For executing and isolating code in multiple programming languages.
-   **Stripe API**: For payment processing.
-   **S3/Cloud Storage**: For storing user-uploaded files.

## Usage

### Admin Features

-   Manage courses, users, and analytics.

### Instructor Features

-   Create courses, live stream, and collaborate using whiteboards.

### Student Features

-   Enroll in courses, participate in discussions, and complete tasks.

## Roadmap

-   Add support for AI-powered content recommendations.
-   Implement offline mode for course consumption.
-   Enhance live streaming with recording and playback features.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

-   [MUX](https://www.mux.com/) for video streaming support.
-   [LiveKit](https://livekit.io/) for real-time communication tools.
-   [Convex Database](https://stack.convex.dev/) for real-time synchronization.
-   [Prisma](https://www.prisma.io/) for database management.

## Contact

For any inquiries or support, please contact [21521609@gm.uit.edu.vn](mailto:21521609@gm.uit.edu.vn).
