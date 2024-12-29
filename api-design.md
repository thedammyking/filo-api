
# File Uploader App Design

## Architecture Design

The system is designed with a modular and extensible architecture to support file uploads (local, URLs, torrents/magnet links) and integration with multiple cloud storage providers.

### Component Diagram
<img src="image.png" alt="File Uploader App Design" />


### Components

- **REST API**: Provides endpoints for all app functionalities.
- **Authentication**: Manages user authentication and authorization.
- **Cloud Providers**: Manages cloud providers and their connections.
- **Stream Manager**: Streams files directly to cloud providers without server storage.
- **Task Queue**: Manages file upload/download tasks efficiently.
- **Cloud API Adapter**: Abstracts cloud storage interactions for Google Drive, Dropbox, and other providers.

---

## API Design

### Authentication
1. **POST** `/auth/login`: Authenticate and obtain JWT tokens.
2. **POST** `/auth/register`: Register a new user.

### File Upload Operations
1. **POST** `/files/upload`: Upload a local file to a cloud provider.
2. **POST** `/files/upload-url`: Stream a file from a URL to a cloud provider.
3. **POST** `/files/upload-torrent`: Process a torrent/magnet link and stream it to a cloud provider.

### Task Management
1. **GET** `/tasks/{task_id}`: Get the status of a specific task.
2. **GET** `/tasks`: List all tasks for the user.

### Cloud Integration Management
1. **GET** `/cloud-providers`: List available cloud providers.
2. **POST** `/cloud-providers/connect`: Connect a cloud provider via OAuth.
3. **DELETE** `/cloud-providers/{provider}`: Disconnect a cloud provider.

---