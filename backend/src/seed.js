import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Article from './models/Article.js';
import Blog from './models/Blog.js';

const initialArticles = [
  {
    name: 'learn-react',
    upvotes: 12,
    comments: [
      {
        username: 'Alex',
        text: 'This article was super helpful for understanding React state and hooks!',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
      {
        username: 'Sarah',
        text: 'Great overview of React components. Looking forward to more posts!',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
    ],
  },
  {
    name: 'learn-node',
    upvotes: 8,
    comments: [
      {
        username: 'David',
        text: 'Node.js event loop explained so clearly. Thank you!',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
    ],
  },
  {
    name: 'my-thoughts-on-resumes',
    upvotes: 15,
    comments: [
      {
        username: 'Jessica',
        text: 'The advice on custom quotes for resumes is spot on!',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ],
  },
  {
    name: 'mongodb-express-guide',
    upvotes: 20,
    comments: [
      {
        username: 'Michael',
        text: 'Awesome guide on combining MongoDB with Express and Mongoose schemas.',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
    ],
  },
];

const initialBlogs = [
  {
    name: 'learn-react',
    title: 'The Fastest Way to Learn React in 2026',
    author: 'John Doe',
    content:
      'React is one of the most popular JavaScript libraries for developing powerful, interactive web applications. You will learn how to start with React and build up to dynamic user interfaces. You will work with React specific concepts like JSX, components, state, props, hooks, and context API. React has been designed from the start for gradual adoption, making it perfect for both simple interactive components and complex enterprise applications.',
  },
  {
    name: 'learn-node',
    title: 'How to Build a High-Performance Node Server in 10 Minutes',
    author: 'Jane Smith',
    content:
      'Explore the fundamental components of backend web applications using the Node.js JavaScript runtime environment. Learn how non-blocking asynchronous I/O enables Node.js to handle thousands of concurrent client connections smoothly using Express.js middleware and RESTful API architecture.',
  },
  {
    name: 'my-thoughts-on-resumes',
    title: 'My Thoughts on Resumes and Standout Engineering Profiles',
    author: 'Emily Johnson',
    content:
      'The elements you choose for your tech resume say a lot about who you are and your engineering mindset. Selecting meaningful quotes and highlighting impactful project achievements sets you apart from candidates with similar technical backgrounds.',
  },
  {
    name: 'mongodb-express-guide',
    title: 'Mastering MongoDB & Express for Scalable MERN Applications',
    author: 'Javed Khan',
    content:
      'MongoDB provides incredible flexibility for modern web apps with its document-oriented structure. Pairing MongoDB with Mongoose and Express allows you to define strict schemas, perform seamless validation with Joi, and implement efficient database indexing for peak performance.',
  },
];

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB database...');
    await connectDB();

    console.log('[Seed] Clearing existing Articles and Blogs collections...');
    await Article.deleteMany({});
    await Blog.deleteMany({});

    console.log('[Seed] Inserting initial Articles metadata...');
    const createdArticles = await Article.insertMany(initialArticles);
    console.log(`[Seed] Successfully seeded ${createdArticles.length} articles.`);

    console.log('[Seed] Inserting initial Blogs content...');
    const createdBlogs = await Blog.insertMany(initialBlogs);
    console.log(`[Seed] Successfully seeded ${createdBlogs.length} blogs.`);

    console.log('✅ [Seed] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ [Seed] Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
