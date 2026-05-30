const mongoose = require("mongoose");
const Course = require("./Course");
const Enrollment = require("./Enrollment");
const Certificate = require("./Certificate");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    

    console.log(
      "MongoDB Connected"
    );
  })
  .catch((err) => {
    console.log(
      "MongoDB Error:",
      err
    );
  });

const courses = [
    {
    title: "Complete React.js Masterclass",
    category: "Frontend Development",
    level: "Intermediate",
    instructor: "Prithiviraj T",
    thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    description:
        "Learn React from beginner to advanced level with hooks, routing, context API and real-world projects.",

    videos: [
        {
        title: "Introduction to React",
        videoUrl:
            "https://www.youtube.com/embed/Tn6-PIqc4UM",
        duration: "15 min",
        },
        {
        title: "JSX Fundamentals",
        videoUrl:
            "https://www.youtube.com/embed/Ke90Tje7VS0",
        duration: "20 min",
        },
        {
        title: "Components & Props",
        videoUrl:
            "https://www.youtube.com/embed/Y2hgEGPzTZY",
        duration: "25 min",
        },
        {
        title: "React Hooks",
        videoUrl:
            "https://www.youtube.com/embed/f687hBjwFcM",
        duration: "30 min",
        },
        {
        title: "React Router",
        videoUrl:
            "https://www.youtube.com/embed/Law7wfdg_ls",
        duration: "20 min",
        },
    ],
    },
    {
    title: "Node.js & Express Backend Development",
    category: "Backend Development",
    level: "Intermediate",
    instructor: "Prithiviraj T",
    thumbnail:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
    description:
        "Build scalable backend APIs using Express, JWT authentication and MongoDB.",

    videos: [
        {
        title: "Introduction to Node.js",
        videoUrl:
            "https://www.youtube.com/embed/TlB_eWDSMt4",
        duration: "18 min",
        },
        {
        title: "Node.js Modules & NPM",
        videoUrl:
            "https://www.youtube.com/embed/jHDhaSSKmB0",
        duration: "22 min",
        },
        {
        title: "Express.js Fundamentals",
        videoUrl:
            "https://www.youtube.com/embed/L72fhGm1tfE",
        duration: "25 min",
        },
        {
        title: "Building REST APIs with Express",
        videoUrl:
            "https://www.youtube.com/embed/pKd0Rpw7O48",
        duration: "30 min",
        },
        {
        title: "MongoDB & Mongoose Integration",
        videoUrl:
            "https://www.youtube.com/embed/DZBGEVgL2eE",
        duration: "28 min",
        },
        {
        title: "User Authentication with JWT",
        videoUrl:
            "https://www.youtube.com/embed/mbsmsi7l3r4",
        duration: "35 min",
        },
        {
        title: "Password Hashing with Bcrypt",
        videoUrl:
            "https://www.youtube.com/embed/AzA_LTDoFqY",
        duration: "20 min",
        },
        {
        title: "Role-Based Authorization",
        videoUrl:
            "https://www.youtube.com/embed/f2EqECiTBL8",
        duration: "18 min",
        },
        {
        title: "Error Handling & Middleware",
        videoUrl:
            "https://www.youtube.com/embed/lY6icfhap2o",
        duration: "24 min",
        },
        {
        title: "Complete Backend Project",
        videoUrl:
            "https://www.youtube.com/embed/Oe421EPjeBE",
        duration: "45 min",
        },
    ],
    },
    {
    title: "MongoDB Database Essentials",
    category: "Database",
    level: "Beginner",
    instructor: "Prithiviraj T",
    thumbnail:
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
    description:
        "Understand MongoDB collections, schemas, aggregation pipelines and indexing.",

    videos: [
        {
        title: "Introduction to MongoDB",
        videoUrl:
            "https://www.youtube.com/embed/-56x56UppqQ",
        duration: "15 min",
        },
        {
        title: "Installing MongoDB & MongoDB Compass",
        videoUrl:
            "https://www.youtube.com/embed/ExcRbA7fy_A",
        duration: "18 min",
        },
        {
        title: "Databases, Collections & Documents",
        videoUrl:
            "https://www.youtube.com/embed/ofme2o29ngU",
        duration: "20 min",
        },
        {
        title: "CRUD Operations in MongoDB",
        videoUrl:
            "https://www.youtube.com/embed/c2M-rlkkT5o",
        duration: "25 min",
        },
        {
        title: "MongoDB Query Operators",
        videoUrl:
            "https://www.youtube.com/embed/CB9G5Dvv-EE",
        duration: "22 min",
        },
        {
        title: "Schema Design Best Practices",
        videoUrl:
            "https://www.youtube.com/embed/DZBGEVgL2eE",
        duration: "24 min",
        },
        {
        title: "MongoDB Indexing Explained",
        videoUrl:
            "https://www.youtube.com/embed/4RCn5ruyB8U",
        duration: "20 min",
        },
        {
        title: "Aggregation Pipeline Fundamentals",
        videoUrl:
            "https://www.youtube.com/embed/qEDAzgM_hOw",
        duration: "30 min",
        },
        {
        title: "MongoDB with Mongoose",
        videoUrl:
            "https://www.youtube.com/embed/DZBGEVgL2eE",
        duration: "28 min",
        },
        {
        title: "Complete MongoDB Project",
        videoUrl:
            "https://www.youtube.com/embed/oSIv-E60NiU",
        duration: "40 min",
        },
    ],
    },
    {
    title: "Full Stack MERN Development",
    category: "Web Development",
    level: "Advanced",
    instructor: "Prithiviraj T",
    thumbnail:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    description:
        "Build complete MERN stack applications from authentication to deployment.",

    videos: [
        {
        title: "Introduction to MERN Stack",
        videoUrl:
            "https://www.youtube.com/embed/7CqJlxBYj-M",
        duration: "15 min",
        },
        {
        title: "Setting Up the Development Environment",
        videoUrl:
            "https://www.youtube.com/embed/mrHNSanmqQ4",
        duration: "20 min",
        },
        {
        title: "React.js Fundamentals",
        videoUrl:
            "https://www.youtube.com/embed/bMknfKXIFA8",
        duration: "30 min",
        },
        {
        title: "Node.js & Express.js Backend Setup",
        videoUrl:
            "https://www.youtube.com/embed/Oe421EPjeBE",
        duration: "35 min",
        },
        {
        title: "MongoDB & Mongoose Integration",
        videoUrl:
            "https://www.youtube.com/embed/DZBGEVgL2eE",
        duration: "28 min",
        },
        {
        title: "Creating RESTful APIs",
        videoUrl:
            "https://www.youtube.com/embed/pKd0Rpw7O48",
        duration: "30 min",
        },
        {
        title: "JWT Authentication & Authorization",
        videoUrl:
            "https://www.youtube.com/embed/mbsmsi7l3r4",
        duration: "35 min",
        },
        {
        title: "Building React Forms & Validation",
        videoUrl:
            "https://www.youtube.com/embed/RS36gBEp8OI",
        duration: "25 min",
        },
        {
        title: "State Management with Context API",
        videoUrl:
            "https://www.youtube.com/embed/35lXWvCuM8o",
        duration: "24 min",
        },
        {
        title: "File Uploads with Multer & Cloudinary",
        videoUrl:
            "https://www.youtube.com/embed/SR5GxoFhIAU",
        duration: "27 min",
        },
        {
        title: "Building an E-Commerce MERN Application",
        videoUrl:
            "https://www.youtube.com/embed/y99YgaQjgx4",
        duration: "45 min",
        },
        {
        title: "Frontend & Backend Integration",
        videoUrl:
            "https://www.youtube.com/embed/0divhP3pEsg",
        duration: "30 min",
        },
        {
        title: "Deploying MERN Apps on Render & Vercel",
        videoUrl:
            "https://www.youtube.com/embed/NBQbJx8WkEQ",
        duration: "22 min",
        },
        {
        title: "Performance Optimization & Security",
        videoUrl:
            "https://www.youtube.com/embed/C34xPy4i0oA",
        duration: "20 min",
        },
        {
        title: "Complete MERN Stack Capstone Project",
        videoUrl:
            "https://www.youtube.com/embed/98BzS5Oz5E4",
        duration: "60 min",
        },
    ],
    },
    {
    title: "JavaScript ES6+ Complete Guide",
    category: "Programming",
    level: "Beginner",
    instructor: "Prithiviraj T",
    thumbnail:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    description:
        "Master JavaScript fundamentals, ES6+, promises, async-await and advanced concepts.",

    videos: [
        {
        title: "Introduction to JavaScript",
        videoUrl:
            "https://www.youtube.com/embed/W6NZfCO5SIk",
        duration: "20 min",
        },
        {
        title: "Variables, Data Types & Operators",
        videoUrl:
            "https://www.youtube.com/embed/hdI2bqOjy3c",
        duration: "25 min",
        },
        {
        title: "Functions & Scope in JavaScript",
        videoUrl:
            "https://www.youtube.com/embed/N8ap4k_1QEQ",
        duration: "22 min",
        },
        {
        title: "Arrays and Array Methods",
        videoUrl:
            "https://www.youtube.com/embed/R8rmfD9Y5-c",
        duration: "28 min",
        },
        {
        title: "Objects and Object Methods",
        videoUrl:
            "https://www.youtube.com/embed/X0ipw1k7ygU",
        duration: "24 min",
        },
        {
        title: "ES6 Let, Const & Arrow Functions",
        videoUrl:
            "https://www.youtube.com/embed/h33Srr5J9nY",
        duration: "20 min",
        },
        {
        title: "Template Literals, Destructuring & Spread Operator",
        videoUrl:
            "https://www.youtube.com/embed/NIq3qLaHCIs",
        duration: "26 min",
        },
        {
        title: "DOM Manipulation & Events",
        videoUrl:
            "https://www.youtube.com/embed/5fb2aPlgoys",
        duration: "35 min",
        },
        {
        title: "Promises in JavaScript",
        videoUrl:
            "https://www.youtube.com/embed/DHvZLI7Db8E",
        duration: "22 min",
        },
        {
        title: "Async Await Explained",
        videoUrl:
            "https://www.youtube.com/embed/V_Kr9OSfDeU",
        duration: "20 min",
        },
        {
        title: "Fetch API & Working with JSON",
        videoUrl:
            "https://www.youtube.com/embed/cuEtnrL9-H0",
        duration: "25 min",
        },
        {
        title: "Error Handling & Debugging",
        videoUrl:
            "https://www.youtube.com/embed/cFTFtuEQ-10",
        duration: "18 min",
        },
        {
        title: "JavaScript Classes & OOP",
        videoUrl:
            "https://www.youtube.com/embed/PFmuCDHHpwk",
        duration: "30 min",
        },
        {
        title: "Modules & Modern JavaScript Development",
        videoUrl:
            "https://www.youtube.com/embed/cRHQNNcYf6s",
        duration: "24 min",
        },
        {
        title: "Complete JavaScript Project",
        videoUrl:
            "https://www.youtube.com/embed/jS4aFq5-91M",
        duration: "50 min",
        },
    ],
    },
    {
    title: "Tailwind CSS & Responsive Design",
    category: "Frontend Development",
    level: "Intermediate",
    instructor: "Prithiviraj T",
    thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    description:
        "Create modern responsive user interfaces using Tailwind CSS.",

    videos: [
        {
        title: "Introduction to Tailwind CSS",
        videoUrl:
            "https://www.youtube.com/embed/dFgzHOX84xQ",
        duration: "15 min",
        },
        {
        title: "Installing & Configuring Tailwind CSS",
        videoUrl:
            "https://www.youtube.com/embed/lCxcTsOHrjo",
        duration: "20 min",
        },
        {
        title: "Utility Classes Fundamentals",
        videoUrl:
            "https://www.youtube.com/embed/UBOj6rqRUME",
        duration: "22 min",
        },
        {
        title: "Typography, Colors & Spacing",
        videoUrl:
            "https://www.youtube.com/embed/6biMWgD6_JY",
        duration: "25 min",
        },
        {
        title: "Flexbox with Tailwind CSS",
        videoUrl:
            "https://www.youtube.com/embed/fYq5PXgSsbE",
        duration: "18 min",
        },
        {
        title: "CSS Grid Layouts",
        videoUrl:
            "https://www.youtube.com/embed/9zBsdzdE4sM",
        duration: "24 min",
        },
        {
        title: "Responsive Design Fundamentals",
        videoUrl:
            "https://www.youtube.com/embed/x4u1yp3Msao",
        duration: "20 min",
        },
        {
        title: "Responsive Navigation Bar",
        videoUrl:
            "https://www.youtube.com/embed/pfaSUYaSgRo",
        duration: "22 min",
        },
        {
        title: "Building Cards & Components",
        videoUrl:
            "https://www.youtube.com/embed/mr15Xzb1Ook",
        duration: "28 min",
        },
        {
        title: "Dark Mode Implementation",
        videoUrl:
            "https://www.youtube.com/embed/bt2KZxA4mNo",
        duration: "16 min",
        },
        {
        title: "Forms & Validation UI Design",
        videoUrl:
            "https://www.youtube.com/embed/Jn6-IO6hG0A",
        duration: "24 min",
        },
        {
        title: "Animations & Transitions",
        videoUrl:
            "https://www.youtube.com/embed/n4R2E7O-Ngo",
        duration: "18 min",
        },
        {
        title: "Building a Complete Landing Page",
        videoUrl:
            "https://www.youtube.com/embed/cvPbHkR6eFw",
        duration: "35 min",
        },
        {
        title: "Portfolio Website with Tailwind CSS",
        videoUrl:
            "https://www.youtube.com/embed/x7mwVn2z3Sk",
        duration: "40 min",
        },
        {
        title: "Complete Responsive Tailwind Project",
        videoUrl:
            "https://www.youtube.com/embed/tS7upsfuxmo",
        duration: "55 min",
        },
    ],
    },
    {
    title: "REST API Development with Express",
    category: "Backend Development",
    level: "Intermediate",
    instructor: "Prithiviraj T",
    thumbnail:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
    description:
        "Design secure REST APIs with validation, middleware and authentication.",

    videos: [
        {
        title: "Introduction to REST APIs",
        videoUrl:
            "https://www.youtube.com/embed/qwfE7fSVaZM",
        duration: "15 min",
        },
        {
        title: "Setting Up Node.js & Express",
        videoUrl:
            "https://www.youtube.com/embed/L72fhGm1tfE",
        duration: "20 min",
        },
        {
        title: "Understanding HTTP Methods",
        videoUrl:
            "https://www.youtube.com/embed/iYM2zFP3Zn0",
        duration: "18 min",
        },
        {
        title: "Creating Your First Express API",
        videoUrl:
            "https://www.youtube.com/embed/pKd0Rpw7O48",
        duration: "25 min",
        },
        {
        title: "Express Routing Fundamentals",
        videoUrl:
            "https://www.youtube.com/embed/MWf0hPSMJxs",
        duration: "22 min",
        },
        {
        title: "Request Validation with Express Validator",
        videoUrl:
            "https://www.youtube.com/embed/6LYy3xjQ4vU",
        duration: "24 min",
        },
        {
        title: "MongoDB Integration with Mongoose",
        videoUrl:
            "https://www.youtube.com/embed/DZBGEVgL2eE",
        duration: "28 min",
        },
        {
        title: "JWT Authentication",
        videoUrl:
            "https://www.youtube.com/embed/mbsmsi7l3r4",
        duration: "35 min",
        },
        {
        title: "Role-Based Authorization",
        videoUrl:
            "https://www.youtube.com/embed/f2EqECiTBL8",
        duration: "20 min",
        },
        {
        title: "Middleware in Express.js",
        videoUrl:
            "https://www.youtube.com/embed/lY6icfhap2o",
        duration: "22 min",
        },
        {
        title: "Error Handling & Logging",
        videoUrl:
            "https://www.youtube.com/embed/cFTFtuEQ-10",
        duration: "18 min",
        },
        {
        title: "File Uploads with Multer",
        videoUrl:
            "https://www.youtube.com/embed/SR5GxoFhIAU",
        duration: "25 min",
        },
        {
        title: "API Security Best Practices",
        videoUrl:
            "https://www.youtube.com/embed/17TRcpJtG4A",
        duration: "20 min",
        },
        {
        title: "Testing APIs with Postman",
        videoUrl:
            "https://www.youtube.com/embed/VywxIQ2ZXw4",
        duration: "18 min",
        },
        {
        title: "Complete REST API Project",
        videoUrl:
            "https://www.youtube.com/embed/Oe421EPjeBE",
        duration: "50 min",
        },
    ],
    },
    {
    title: "Docker & Deployment Fundamentals",
    category: "DevOps",
    level: "Advanced",
    instructor: "Prithiviraj T",
    thumbnail:
        "https://images.unsplash.com/photo-1605745341112-85968b19335b",
    description:
        "Containerize applications using Docker and deploy them in production.",

    videos: [
        {
        title: "Introduction to Docker",
        videoUrl:
            "https://www.youtube.com/embed/fqMOX6JJhGo",
        duration: "18 min",
        },
        {
        title: "Installing Docker & Docker Desktop",
        videoUrl:
            "https://www.youtube.com/embed/Gjnup-PuquQ",
        duration: "15 min",
        },
        {
        title: "Understanding Containers & Images",
        videoUrl:
            "https://www.youtube.com/embed/3c-iBn73dDE",
        duration: "22 min",
        },
        {
        title: "Working with Docker CLI Commands",
        videoUrl:
            "https://www.youtube.com/embed/pTFZFxd4hOI",
        duration: "20 min",
        },
        {
        title: "Creating Your First Dockerfile",
        videoUrl:
            "https://www.youtube.com/embed/b0HMimUb4f0",
        duration: "25 min",
        },
        {
        title: "Building and Running Docker Images",
        videoUrl:
            "https://www.youtube.com/embed/gAkwW2tuIqE",
        duration: "24 min",
        },
        {
        title: "Docker Volumes & Persistent Storage",
        videoUrl:
            "https://www.youtube.com/embed/p2PH_YPCsis",
        duration: "18 min",
        },
        {
        title: "Docker Networking Fundamentals",
        videoUrl:
            "https://www.youtube.com/embed/bKFMS5C4CG0",
        duration: "20 min",
        },
        {
        title: "Docker Compose for Multi-Container Apps",
        videoUrl:
            "https://www.youtube.com/embed/Qw9zlE3t8Ko",
        duration: "30 min",
        },
        {
        title: "Containerizing a MERN Stack Application",
        videoUrl:
            "https://www.youtube.com/embed/4s3Zad8A3cw",
        duration: "35 min",
        },
        {
        title: "Dockerizing Node.js Applications",
        videoUrl:
            "https://www.youtube.com/embed/9zUHg7xjIqQ",
        duration: "28 min",
        },
        {
        title: "Deploying Containers to Render",
        videoUrl:
            "https://www.youtube.com/embed/r-H2B7PjM4M",
        duration: "20 min",
        },
        {
        title: "Deploying Docker Apps to AWS",
        videoUrl:
            "https://www.youtube.com/embed/k7Qm6J0A6Y8",
        duration: "32 min",
        },
        {
        title: "Docker Security & Best Practices",
        videoUrl:
            "https://www.youtube.com/embed/kinF3GfR8dA",
        duration: "18 min",
        },
        {
        title: "Complete Docker Deployment Project",
        videoUrl:
            "https://www.youtube.com/embed/3c-iBn73dDE",
        duration: "55 min",
        },
    ],
    },
    {
    title: "System Design for Web Applications",
    category: "Software Architecture",
    level: "Advanced",
    instructor: "Prithiviraj T",
    thumbnail:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    description:
        "Learn scalable architectures, caching, load balancing and microservices.",

    videos: [
        {
        title: "Introduction to System Design",
        videoUrl:
            "https://www.youtube.com/embed/UzLMhqg3_Wc",
        duration: "18 min",
        },
        {
        title: "Scalability Fundamentals",
        videoUrl:
            "https://www.youtube.com/embed/9-Jlfhx72_4",
        duration: "22 min",
        },
        {
        title: "Client-Server Architecture",
        videoUrl:
            "https://www.youtube.com/embed/o5n85GRKuzk",
        duration: "20 min",
        },
        {
        title: "Database Scaling Techniques",
        videoUrl:
            "https://www.youtube.com/embed/vvhC64hQZMk",
        duration: "28 min",
        },
        {
        title: "Caching with Redis",
        videoUrl:
            "https://www.youtube.com/embed/jgpVdJB2sKQ",
        duration: "25 min",
        },
        {
        title: "Load Balancers Explained",
        videoUrl:
            "https://www.youtube.com/embed/K0Ta65OqQkY",
        duration: "20 min",
        },
        {
        title: "API Gateway Architecture",
        videoUrl:
            "https://www.youtube.com/embed/6ULyxuHKxg8",
        duration: "18 min",
        },
        {
        title: "Message Queues & Event-Driven Systems",
        videoUrl:
            "https://www.youtube.com/embed/7aPUVxB4Z6M",
        duration: "24 min",
        },
        {
        title: "Microservices Architecture",
        videoUrl:
            "https://www.youtube.com/embed/lL_j7ilk7rc",
        duration: "30 min",
        },
        {
        title: "Monolithic vs Microservices",
        videoUrl:
            "https://www.youtube.com/embed/CZ3wIuvmHeM",
        duration: "22 min",
        },
        {
        title: "Designing a URL Shortener",
        videoUrl:
            "https://www.youtube.com/embed/i9N4vJ5THA8",
        duration: "35 min",
        },
        {
        title: "Designing a Chat Application",
        videoUrl:
            "https://www.youtube.com/embed/fHdTQzMVjv8",
        duration: "32 min",
        },
        {
        title: "Designing an E-Commerce System",
        videoUrl:
            "https://www.youtube.com/embed/NN4fQ8Lvi8Y",
        duration: "38 min",
        },
        {
        title: "System Monitoring & Observability",
        videoUrl:
            "https://www.youtube.com/embed/h0gbvOC4TfA",
        duration: "20 min",
        },
        {
        title: "Complete System Design Interview Case Study",
        videoUrl:
            "https://www.youtube.com/embed/bUHFg8CZFws",
        duration: "60 min",
        },
    ],
    },
];

const seedCourses =
  async () => {
    try {
       // Clear old data
       

      await Course.insertMany(
        courses
      );

      console.log(
        "10 Courses Inserted Successfully"
      );

      process.exit(0);
    } catch (error) {
      console.log(error);

      process.exit(1);
    }
  };


setTimeout(() => {
  seedCourses();
}, 3000);