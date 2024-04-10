**Introduction**
Teebay is a demo online marketplace solution for buying, selling, and renting products of needs. Teebay is built using a modern tech stack, incorporating cutting-edge technologies in both the frontend and backend to provide a seamless user experience.

**Frontend Technologies**
In the frontend, Teebay leverages the following technologies:

React: A popular JavaScript library for building user interfaces, providing a robust and efficient development experience.
Vite: A fast, modern build tool that serves as the frontend development server and bundler, enabling rapid development and hot module replacement.
Tailwind CSS: A utility-first CSS framework that streamlines styling and design, allowing for rapid prototyping and consistent UI across the application.
Apollo Client: A comprehensive GraphQL client for React applications, facilitating efficient data fetching and management through GraphQL queries and mutations.
Redux: A predictable state container for JavaScript applications, utilized for managing complex application state and enabling seamless interaction between components.

**Backend Technologies**
On the backend, Teebay employs a powerful tech stack comprising:

Express.js: A minimal and flexible Node.js web application framework, used for building robust and scalable backend APIs.
GraphQL: A query language for APIs, enabling clients to request only the data they need and reducing over-fetching and under-fetching of data.
Apollo Server: A GraphQL server implementation for Node.js, facilitating the creation of GraphQL APIs and handling GraphQL queries and mutations.
Prisma: An ORM (Object-Relational Mapping) tool that simplifies database access and management, allowing for seamless interaction with the PostgreSQL database.
PostgreSQL: A powerful open-source relational database management system, chosen for its scalability, reliability, and extensibility.
JWT (JSON Web Tokens): A compact, URL-safe means of representing claims to be transferred between two parties, used for secure user authentication and authorization.

## Challenges Faced and Solutions Implemented

1.  **Choosing Tech Stack:**

- **Issue:** Choosing the appropriate tech stack, including Express.js, Prisma, GraphQL, and Apollo Server.
- **Solution:** As per instructions, Express is one of the most used node.js framework. However, since Prisma was specified, I explored Express.js and FastAPI. Being a beginner in both, I opted for Express.js, considering its vast resources and community. Although a challenge, learning and implementing Express.js for the project was a valuable learning experience.

2.  **Understanding Workflow:**

- **Issue:** Grasping the workflows of Express.js, Prisma, GraphQL, and Apollo Server.
- **Solution:** As a newcomer to GraphQL , I embarked on a thorough learning journey. I extensively relied on tutorials, documentation, and online resources to comprehend the synergy among Express.js, Prisma, GraphQL, and Apollo Server. This self-directed learning approach allowed me to understand how these technologies collaborate seamlessly and enabled me to implement them effectively in the project.

3.  **Implementing Database Design:**

- **Issue:** Translating project requirements into a coherent and effective database schema for an e-commerce platform.
- **Solution:** Leveraging my prior database design experience, I conducted research on e-commerce database models. I formulated a structured schema encompassing three crucial tables: User, Product, and Transaction. To establish relationships, I employed foreign keys and associations. The "User" table is linked to both "Product" and "Transaction" tables to track ownership and activity. Similarly, the "Product" and "Transaction" tables are related to enable seamless tracking of transactions, whether for purchases or rentals. These well-defined relationships ensure efficient data organization and retrieval, forming the foundation for the entire system.

4.  **Implementing Authentication:**

- **Issue**: Integrating Authentication using graphql and express
- **Solution:** The challenge lay not in the concept of authentication, but in applying it within a new technology stack. I adopted JSON Web Token (JWT) for secure user access. I employed the jsonwebtoken library to generate tokens. During registration, tokens were stored in the database. Upon login, a new token was generated and saved, ensuring future verification for client requests. This implementation guarantees secure and authenticated interactions with the API, allowing users to access authorized content seamlessly.

5.  **Implementing Apollo Cache:**

- **Issue**: Optimizing data retrieval and UI updates using Apollo Client's cache.
- **Solution:** Leveraging Apollo Client's cache mechanism, I optimized data retrieval and UI updates. I employed various strategies to handle UI state updates. Upon query completion, I re-requested data that was affected, reducing unnecessary network traffic. Additionally, after performing updates, I fetched the updated data and directly updated the Apollo cache. This approach greatly reduced network requests and enhanced the efficiency of the application, which was beneficial in multiple areas of the project.

6.  **Implementing Apollo:**

- **Issue**: Integrating Apollo Server with Express to expose GraphQL APIs.
- **Solution:** I combined Apollo Server and Express to create GraphQL APIs. I set up the data structure, defined how to interact with it (resolvers), and ensured secure communication through authentication checks. This seamless fusion guarantees safe and smooth interaction between users and the API, simplifying data requests and updates.

7.  **Implementation of useQuery and useMutation:**

- **Issue**: Fetching data and performing mutations using Apollo Client hooks.
- **Solution:** Initially, I faced confusion regarding the implementation of CRUD operations in Apollo Client. Relying on the documentation, I grasped the fundamentals of these operations and gradually improved my approach to ensure secure and efficient requests. I extended the knowledge I gained from the documentation to refine and secure the communication between the frontend and the GraphQL API, enhancing the overall data handling process.

8.  **Managing Roles:**

- **Issue:** Implementing Role-Based Access Control and switching roles from frontend
- **Solution:** To manage user roles effectively, I incorporated a system where users start as customers by default. Through API requests, users can dynamically change their roles to become sellers. I ensured that user roles are checked within the database and then communicated to the frontend. This approach allows for seamless role management and access control based on user privileges.

9.  **Rental System Implementation:**

- **Issue: Handling Rental System:**
- **Solution:** To implement a rental system, I designed logic to freeze products during rental periods. Users can rent products within specified "from" and "until" dates, which are stored in the database. I implemented a cron job to automatically update product availability once the rental period ends, making the system user-friendly and efficient.

In summary, these challenges were addressed through a combination of research, thoughtful design, technology integration, and code implementation to create a functional and efficient product.
