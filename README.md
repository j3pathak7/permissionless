Government Policy Education AI Chatbot

Overview
This project aims to empower citizens by providing easy access to information about government policies, particularly focusing on financial policies. The AI-powered chatbot simplifies complex policy details, answers frequently asked questions, and offers personalized assistance to users.

Technologies Used
Frontend: Next.js
Backend: FastAPI
Natural Language Processing (NLP): Claude 3 Opus
Deployment: Render (for FastAPI backend), Vercel (for Next.js frontend)
Features
User-friendly interface for easy navigation and interaction.
Explanation of complex financial policies in simple terms.
FAQ handling to address common user queries.
Personalized responses based on user input.
Integration with Claude 3 Opus for AI chatbot capabilities.
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/your-username/government-policy-chatbot.git
Navigate to the project directory:
bash
Copy code
cd government-policy-chatbot
Install dependencies:
bash
Copy code
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
Usage
Start the FastAPI backend:
bash
Copy code
# Navigate to the backend directory
cd backend

# Start the FastAPI server
uvicorn main:app --reload
Start the Next.js frontend:
bash
Copy code
# Navigate to the frontend directory
cd ../frontend

# Start the Next.js development server
npm run dev
Access the chatbot interface in your browser at http://localhost:3000.
Deployment
Deploy the FastAPI backend to Heroku using the provided Dockerfile.
Deploy the Next.js frontend to Vercel for seamless hosting and scaling.
Contributing
Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

License
This project is licensed under the MIT License.
