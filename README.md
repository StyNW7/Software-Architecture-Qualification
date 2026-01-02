# Software Architecture Project

This repository contains Software Architecture SLC Post Training Qualification Project. The project is divided into two main sections:

1.  **Design Patterns:** Implementation of three specific design patterns (Builder, Adapter, Observer).
2.  **Microservices Architecture:** A complete microservices system built with **NestJS**, consisting of an API Gateway and three distinct services (Auth, User, Post) using a **Database-per-Service** pattern with MySQL and Prisma.

---

## 📋 Prerequisites

Before running the project, ensure you have the following installed on your machine:

* **Node.js** (v18 or later recommended)
* **MySQL Database** (Running on port 3306)
* **npm** (Node Package Manager)

---

## 🚀 Part 1: Design Patterns

The design patterns are implemented as standalone TypeScript logic scripts located in the `Design Pattern` folder.

### 1. Setup Dependencies
Open a terminal in the root directory and install the necessary tools to run TypeScript files:

```bash
npm install -D ts-node typescript
```

### 2. Running the Cases

You can execute each pattern directly from the terminal to observe the logic output.

**Case 1: Builder Pattern (Creational)**

* **Scenario:** Constructing complex "Vacation Packages" (Luxury vs. Backpacker) step-by-step.
* **Run Command:**
```bash
npx ts-node "./Design-Pattern/Case-1-Creational-Pattern/Builder-Pattern.ts"
```

**Case 2: Adapter Pattern (Structural)**

* **Scenario:** Adapting an old "SD Card" to work with a modern "USB-C Laptop" interface.
* **Run Command:**
```bash
npx ts-node "./Design-Pattern/Case-2-Structural-Pattern/Adapter-Pattern.ts"
```

**Case 3: Observer Pattern (Behavioral)**

* **Scenario:** A Bitcoin Market tracker that notifies different types of investors (Whale, Panic Seller) when prices change.
* **Run Command:**
```bash
npx ts-node "./Design-Pattern/Case-3-Behavioural-Pattern/Observer-Pattern.ts"
```

---

## 🌐 Part 2: Microservices Architecture

The system consists of 4 separate NestJS applications running simultaneously:

| Service | Port | Description |
| --- | --- | --- |
| **API Gateway** | `3000` | The entry point. Forwards requests to background services. |
| **Auth Service** | `3001` | Handles Registration & Login (JWT Generation). |
| **User Service** | `3002` | Manages user profiles. |
| **Post Service** | `3003` | Manages blog posts linked to users. |

### 1. Database Setup (MySQL)

This project uses a **Database-per-Service** architecture. You must initialize three separate databases.

**Step A: Configure Environment Variables**

Ensure the `.env` file in each service folder (`auth-service`, `user-service`, `post-service`) contains your correct MySQL credentials.

* *Example:* `DATABASE_URL=mysql://root@localhost:3306/software_arch_auth"`

You can also check the .env.example from the root folder and copy it to each service. However, please don't forget to change the DATABASE_URL and PORT.

**Step B: Run Migrations**

Open 3 separate terminals to create the tables for each service:

**Terminal 1 (Auth DB):**

```bash
cd auth-service
npm install
npx prisma migrate dev --name init_auth
```

**Terminal 2 (User DB):**

```bash
cd user-service
npm install
npx prisma migrate dev --name init_user
```

**Terminal 3 (Post DB):**

```bash
cd post-service
npm install
npx prisma migrate dev --name init_post
```

### 2. Starting the Microservices

You need to run all 4 applications at the same time. Open 4 separate terminal windows or tabs:

**Terminal 1: Start Auth Service**

```bash
cd auth-service
npm run start:dev
# Server starts on http://localhost:3001
```

**Terminal 2: Start User Service**

```bash
cd user-service
npm run start:dev
# Server starts on http://localhost:3002
```

**Terminal 3: Start Post Service**

```bash
cd post-service
npm run start:dev
# Server starts on http://localhost:3003
```

**Terminal 4: Start API Gateway (Main Entry Point)**

```bash
cd api-gateway
npm install
npm run start:dev
# Gateway starts on http://localhost:3000
```

---

## 🧪 How to Test (Swagger UI)

The entire system is integrated via the **API Gateway**. You can test the full flow using the Swagger Documentation.

**1. Access Swagger:**
Open your browser and go to: [http://localhost:3000/api](https://www.google.com/search?q=http://localhost:3000/api)

**2. Register a New User:**

* Expand **Auth** -> `POST /auth/register`
* Click **Try it out** and enter a username/password.
* *Note:* This will create the user in the Auth DB and automatically sync it to the User DB.

**3. Login:**

* Expand **Auth** -> `POST /auth/login`
* Enter your credentials and execute.
* Copy the `access_token` from the response body.

**4. Authorize (Unlock Protected Endpoints):**

* Click the green **Authorize** button at the top right of the Swagger page.
* Paste your token (e.g., `Bearer <your_token_here>`).
* Click **Authorize** -> **Close**.

**5. Create a Post:**

* Expand **Posts** -> `POST /posts`
* Enter a title and content.
* *Note:* You do **not** need to provide a `user_id`. The system automatically extracts your ID from the token you authorized with.

**6. Verify Data:**

* Use `GET /posts` or `GET /users` to confirm that data is being stored and retrieved correctly across the microservices.

<code>Made with 🤍 by NW25-1</code>