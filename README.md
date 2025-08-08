# Cricket-Application
A full-stack web application to display real-time cricket match data, player stats built with React for the frontend and Spring Boot for the backend, providing live scores, latest news, player profiles, team rankings, and tournament details.

✨ Features
Live Scores: Real-time updates for ongoing matches.
Recent & Upcoming Matches: Browse past results and future fixtures.
Latest News: Stay informed with featured and categorized cricket news.
Player Profiles: Detailed statistics and information for individual players.
Team Rankings: ICC rankings for Test, ODI, and T20I formats.
Series & Tournaments: Information on ongoing, upcoming, and completed cricket series and tournaments.
Responsive Design: Optimized for various screen sizes using Tailwind CSS.
Theme Toggle: Switch between light and dark modes.
Backend Integration: Fetches dynamic data from a Spring Boot REST API.

🚀 Technologies Used
Frontend
Next.js 14: React framework for server-side rendering and routing.
React 18: JavaScript library for building user interfaces.
TypeScript: Strongly typed superset of JavaScript.
Tailwind CSS: Utility-first CSS framework for rapid styling.
shadcn/ui: Reusable UI components built with Radix UI and Tailwind CSS.
Lucide React: Beautiful and customizable open-source icons.
Backend
Spring Boot: Framework for building robust, production-ready, stand-alone Spring applications.
Java: Programming language for the backend.
Spring Data JPA: For easy data access with relational databases.
MySQL / H2 Database: Relational database for storing cricket data.
Maven: Dependency management and build automation tool.
⚙️ Setup Instructions
To get this project up and running, you'll need to set up both the frontend and the backend.

1. Backend Setup (Spring Boot)
The backend provides the RESTful API endpoints that the frontend consumes.

Prerequisites
Java Development Kit (JDK) 17 or higher
Maven
(Optional) MySQL database server or use the in-memory H2 database.
Steps
Clone the Backend Repository:

# Assuming your Spring Boot backend is in a separate repository or directory
git clone <your-spring-boot-backend-repo-url>
cd <your-spring-boot-backend-directory>
Database Configuration:

MySQL (Recommended for Production):
Create a MySQL database (e.g., cricket_db).
Update src/main/resources/application.properties (or application.yml) with your MySQL connection details:
spring.datasource.url=jdbc:mysql://localhost:3306/cricket_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=your_mysql_username
spring.datasource.password=your_mysql_password
spring.jpa.hibernate.ddl-auto=update # or create if you want to drop and recreate tables on startup
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
H2 (For Development/Testing):
If you prefer an in-memory database for quick testing, ensure your application.properties has H2 configured:
spring.datasource.url=jdbc:h2:mem:cricketdb;DB_CLOSE_DELAY=-1
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
CORS Configuration: Ensure your Spring Boot application allows requests from your frontend's origin (http://localhost:3000). You might have a CORS configuration class similar to this:

// Example CorsConfig.java
@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Apply CORS to all /api endpoints
                        .allowedOrigins("http://localhost:3000") // Allow your Next.js app
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
Build and Run the Backend:

mvn clean install
mvn spring-boot:run
The backend should now be running on http://localhost:8080.

2. Frontend Setup (React/Next.js)
This is the React application that displays the cricket data.

Prerequisites
Node.js (LTS version recommended)
npm or yarn
Steps
Navigate to the Frontend Directory:

cd <your-frontend-directory> # If you're not already there
Install Dependencies:

npm install
# or
yarn install
Configure API URL: Create a .env.local file in the root of the frontend project and add your backend API URL:

NEXT_PUBLIC_API_URL=http://localhost:8080/api
Run the Development Server:

npm run dev
# or
yarn dev
The frontend application will be accessible at http://localhost:3000.

📂 Project Structure (Frontend)
.
├── app/
│   ├── layout.tsx         # Root layout for the application
│   ├── globals.css        # Global Tailwind CSS styles
│   ├── page.tsx           # Homepage component
│   ├── live-scores/
│   │   └── page.tsx       # Live scores page
│   ├── news/
│   │   └── page.tsx       # News page
│   ├── players/
│   │   └── page.tsx       # Players page
│   ├── teams/
│   │   └── page.tsx       # Teams page (for rankings)
│   ├── rankings/
│   │   └── page.tsx       # Rankings page (teams and players)
│   ├── match-center/
│   │   └── page.tsx       # Detailed match center
│   └── series/
│       └── page.tsx       # Series and tournaments page
├── components/
│   ├── ui/                # shadcn/ui components (auto-generated/managed)
│   ├── header.tsx         # Main application header
│   └── theme-provider.tsx # Custom theme provider for light/dark mode
│   └── theme-toggle.tsx   # Component to toggle theme
├── lib/
│   └── api.ts             # API service for fetching data from backend
├── public/                # Static assets (images, etc.)
├── tailwind.config.ts     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration for Tailwind
├── next.config.js         # Next.js configuration
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file

🌐 API Endpoints (Expected from Backend)
The frontend expects the following REST API endpoints from your Spring Boot backend:

GET /api/matches/live: Fetch live matches.
GET /api/matches/recent: Fetch recent matches.
GET /api/matches/upcoming: Fetch upcoming matches.
GET /api/news/featured: Fetch featured news articles.
GET /api/news: Fetch all news articles.
GET /api/news/category/{category}: Fetch news by category.
GET /api/news/search?q={query}: Search news articles.
GET /api/players/spotlight: Fetch players for spotlight section.
GET /api/players: Fetch all players.
GET /api/players/search?q={query}: Search players.
GET /api/teams/rankings?format={format}: Fetch team rankings by format (e.g., ?format=Test).
GET /api/tournaments: Fetch all tournaments.
Ensure your Spring Boot application implements these endpoints and returns data in the Match, NewsArticle, Player, Team, and Tournament interface formats defined in lib/api.ts.

🤝 Contributing
Contributions are welcome! If you have suggestions or improvements, please feel free to:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature-name).
Make your changes.
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature/your-feature-name).
Open a Pull Request.
