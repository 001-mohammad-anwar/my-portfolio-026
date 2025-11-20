const projects = [
  {
    title: "Personal Portfolio Website",
    slug: "personal-portfolio-website",
    short_description: "A responsive portfolio website built with MERN stack.",
    description:
      "This portfolio showcases my skills, projects, and experience. Built with React, Node.js, and MongoDB. Features include smooth animations, dark/light theme, and contact form integrated with Nodemailer.",
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1720000001/portfolio1.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1720000002/portfolio2.jpg",
    ],
    techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://myportfolio.vercel.app",
    githubUrl: "https://github.com/yourusername/portfolio",
    category: "Full Stack",
    isFeatured: true,
    status: "Active",
  },
  {
    title: "E-Commerce Store",
    slug: "e-commerce-store",
    short_description: "A complete online shopping platform with admin dashboard.",
    description:
      "Developed a scalable e-commerce website where users can browse products, manage carts, and place orders securely. Admins can manage inventory and orders. Integrated Stripe for payments and Cloudinary for image uploads.",
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1720000010/ecommerce1.jpg",
    ],
    techStack: ["React", "Redux Toolkit", "Node.js", "MongoDB", "Stripe API"],
    liveUrl: "https://shopwithanwar.vercel.app",
    githubUrl: "https://github.com/yourusername/ecommerce-store",
    category: "MERN",
    isFeatured: true,
    status: "Active",
  },
  {
    title: "Chat Application",
    slug: "chat-application",
    short_description: "A real-time chat app with Socket.io and JWT auth.",
    description:
      "A modern real-time chat app where users can send messages instantly, view online status, and receive notifications. Authentication handled with JWT, and WebSocket ensures real-time updates.",
    images: [
      "https://res.cloudinary.com/demo/image/upload/v1720000020/chatapp.jpg",
    ],
    techStack: ["React", "Node.js", "Express", "Socket.io", "MongoDB"],
    liveUrl: "https://chatappwithanwar.vercel.app",
    githubUrl: "https://github.com/yourusername/chat-app",
    category: "Full Stack",
    isFeatured: false,
    status: "Active",
  },
];

module.exports = projects