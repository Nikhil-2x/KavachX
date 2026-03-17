# BITWIN-INIT-INDIA_NEXT

## Overview

BITWIN-INIT-INDIA_NEXT is a comprehensive full-stack cybersecurity platform designed to combat modern digital threats. It integrates AI-powered tools for deepfake detection (both image and voice), threat analysis, cyber awareness training, and real-time monitoring through Gmail integration and YouTube video analysis. The platform features interactive 3D visualizations and a chatbot agent to enhance user engagement and education.

## Features

- **Deepfake Detection**: AI models to detect manipulated images and voice recordings
- **Threat Similarity Engine**: Analyze and compare cybersecurity threats
- **Cyber Awareness Training**: Interactive modules and videos for user education
- **Gmail Integration**: Monitor and analyze email threats in real-time
- **YouTube Video Analysis**: Scan and analyze cybersecurity-related content
- **3D Visualizations**: Immersive 3D models for cybersecurity concepts
- **Chatbot Agent**: AI-powered assistant for queries and guidance
- **Website Detector**: Analyze URLs for potential security risks
- **Real-time Communication**: Socket.io integration for live updates

## Tech Stack

### Frontend
- **React 19**: Modern JavaScript library for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Three.js & React Three Fiber**: 3D graphics and animations
- **Socket.io Client**: Real-time bidirectional communication

### Backend
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web application framework
- **Socket.io**: Real-time communication engine
- **Google APIs**: Integration with Gmail and other Google services
- **LangChain & Groq**: AI language model integration for advanced processing

### AI/ML Models
- **Python**: Programming language for machine learning
- **Transformers**: Hugging Face library for NLP and computer vision
- **PyTorch**: Deep learning framework
- **Gradio**: Web UI for machine learning models

## Installation

### Prerequisites
- Node.js (v18 or higher)
- Python 3.8+
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/vinayakpotdar79/BITWIN-INIT-INDIA_NEXT.git
   cd BITWIN-INIT-INDIA_NEXT
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

3. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Install AI Model Dependencies**
   ```bash
   # Deepfake Image Detection
   cd models/deepfake-img
   pip install -r requirements.txt
   cd ../..

   # Deepfake Voice Detection
   cd models/deepfake-voice/DEEP_FAKE_VOICE_DETECTION_USING_AI
   pip install -r requirements.txt
   cd ../../..

   # Agent Model
   cd models/agent
   pip install -r requirements.txt
   cd ../..

   # Kavach Mitra
   cd models/kavachMitra
   pip install -r requirements.txt
   cd ../..

   # Email Service
   cd models/email-service
   pip install -r requierments.txt  # Note: filename has typo in repo
   cd ../..
   ```

5. **Environment Configuration**
   Create a `.env` file in the `server` directory with necessary environment variables:
   ```
   PORT=3000
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GROQ_API_KEY=your_groq_api_key
   # Add other required API keys
   ```

## Usage

### Starting the Application

1. **Start the Backend Server**
   ```bash
   cd server
   node index.js
   ```
   The server will start on `http://localhost:3000`

2. **Start the Frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will be available on `http://localhost:5173` (default Vite port)

3. **Run AI Models**
   Each AI model can be run independently:
   ```bash
   # Deepfake Image Detection
   cd models/deepfake-img/deepfake-detector-model-v1
   python app.py

   # Deepfake Voice Detection
   cd models/deepfake-voice/DEEP_FAKE_VOICE_DETECTION_USING_AI
   python app.py

   # Agent
   cd models/agent
   python agent.py

   # Kavach Mitra
   cd models/kavachMitra
   python kavachMitra.py

   # Email Service
   cd models/email-service
   python app.py
   ```

### API Endpoints

The backend provides several API endpoints:

- `GET /auth/status` - Check authentication status
- `POST /gmail/*` - Gmail-related operations
- `POST /url/*` - URL analysis endpoints
- `POST /image/*` - Image processing endpoints
- `GET /youtube/*` - YouTube video analysis

Refer to the route files in `server/routes/` for detailed endpoint documentation.

## Project Structure

```
BITWIN-INIT-INDIA_NEXT/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── context/          # React context providers
│   │   ├── data/             # Static data files
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API service functions
│   │   └── styles/           # CSS stylesheets
│   └── package.json
├── server/                   # Node.js backend server
│   ├── routes/               # API route handlers
│   ├── services/             # Business logic services
│   ├── socket/               # Socket.io server setup
│   └── package.json
├── models/                   # AI/ML Python models
│   ├── agent/                # AI agent model
│   ├── deepfake-img/         # Image deepfake detection
│   ├── deepfake-voice/       # Voice deepfake detection
│   ├── email-service/        # Email processing service
│   └── kavachMitra/          # Kavach Mitra AI model
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the package.json files for details.

## Contact

For questions or support, please open an issue on the GitHub repository.