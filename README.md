# Expenses Tool

A full-stack expense management application built with Spring Boot and Angular.

## 🏗️ Project Structure

```
expensesTool/
├── expenses-frontend/     # Angular frontend application
│   ├── src/               # Angular source code
│   ├── angular.json       # Angular configuration
│   └── package.json       # Node.js dependencies
├── src/                   # Spring Boot backend
│   ├── main/
│   │   ├── java/          # Java source code
│   │   └── resources/     # Configuration files
│   └── test/              # Test files
├── pom.xml                # Maven configuration
└── docker-compose.yml     # Docker Compose configuration
```

## 🚀 Quick Start

### Prerequisites

- Java 17 or higher
- Maven 3.6+
- Node.js 20.19+ (automatically installed by Maven)
- Docker & Docker Compose (for PostgreSQL)

### Running the Application

1. **Start PostgreSQL database:**
   ```bash
   docker-compose up -d
   ```

2. **Build and run the application:**
   ```bash
   mvn clean spring-boot:run
   ```
   
   This will:
   - Install Node.js and npm (if not present)
   - Install Angular dependencies
   - Build the Angular frontend
   - Compile the Spring Boot backend
   - Start the application on `http://localhost:8080`

3. **Access the application:**
   - Frontend: http://localhost:8080
   - API: http://localhost:8080/expenses, http://localhost:8080/categories

### Development

#### Backend Development

```bash
# Compile only
mvn clean compile

# Run tests
mvn test

# Package application
mvn clean package

# Run with Spring Boot
mvn spring-boot:run
```

#### Frontend Development

```bash
cd expenses-frontend

# Install dependencies
npm install

# Start development server (runs on port 4200)
npm start

# Build for production
npm run build

# Run tests
npm test
```

**Note:** When running Angular dev server separately, configure the API URL in `expenses-frontend/src/app/services/*.ts` to point to `http://localhost:8080`.

## 📦 Build Process

The Maven build automatically:
1. Installs Node.js and npm (via frontend-maven-plugin)
2. Installs Angular dependencies (`npm install`)
3. Builds the Angular application (`npm run build`)
4. Copies build artifacts to `src/main/resources/static`
5. Compiles the Spring Boot application
6. Packages everything into a single JAR file

## 🗄️ Database

The application uses PostgreSQL. Configuration is in `src/main/resources/application.properties`.

**Environment Variables:**
- `DATASOURCE_URL` - Database URL (default: `jdbc:postgresql://localhost:5432/expensestool`)
- `DATASOURCE_USERNAME` - Database username (default: `postgres`)
- `DATASOURCE_PASSWORD` - Database password (default: `postgres`)

**Docker Compose:**
The `docker-compose.yml` file provides a PostgreSQL instance. Set these environment variables:
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`
- `POSTGRES_DB`

## 🧪 Testing

### Backend Tests
```bash
mvn test
```

Uses H2 in-memory database for tests (configured in `src/test/resources/application.properties`).

### Frontend Tests
```bash
cd expenses-frontend
npm test
```

## 📁 Project Structure Details

### Backend (Spring Boot)
- **Controllers**: REST API endpoints (`/expenses`, `/categories`)
- **Services**: Business logic
- **Repositories**: Data access layer (JPA)
- **DTOs**: Data transfer objects
- **Entities**: JPA entities
- **Mappers**: MapStruct mappers for entity-DTO conversion
- **Config**: Configuration classes (CORS, etc.)
- **Exception**: Global exception handling

### Frontend (Angular)
- **Components**: UI components (`expense-form`)
- **Services**: API communication (`expense.ts`, `category.ts`)
- **Routes**: Application routing

## 🔧 Configuration

### Application Properties
- Main: `src/main/resources/application.properties`
- Test: `src/test/resources/application.properties`

### Angular Configuration
- `expenses-frontend/angular.json` - Build configuration
- `expenses-frontend/tsconfig.json` - TypeScript configuration

## 📝 API Endpoints

### Expenses
- `GET /expenses` - Get all expenses
- `POST /expenses` - Create a new expense

### Categories
- `GET /categories` - Get all categories
- `POST /categories` - Create a new category

## 🛠️ Technology Stack

### Backend
- Spring Boot 3.1.4
- Spring Data JPA
- PostgreSQL
- Flyway (database migrations)
- MapStruct (object mapping)
- Lombok

### Frontend
- Angular 21
- TypeScript
- RxJS
- SCSS

### Build Tools
- Maven
- frontend-maven-plugin
- Angular CLI

## 📄 License

[Add your license here]

## 👥 Contributors

[Add contributors here]

