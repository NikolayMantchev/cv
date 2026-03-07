// Store all CV information here
//import photography from "frontend/src/assets/photography.png";
export const CV_DATA = {
  // Personal Information
  personal: {
    name: "Nikolay Mantchev",
    title: "Full Stack JavaScript Web Developer",
    email: "nik.mantchev@gmail.com",
    phone: "+49 15770619973",
    location: "Frankfurt, Germany",
    website: "",
    github: "https://github.com/NikolayMantchev",
    linkedin: "linkedin.com/in/nikolaymantchev",
    avatar: "https://media.licdn.com/dms/image/v2/D4E35AQFsmqa7Jnc0Uw/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1677234354312?e=1773046800&v=beta&t=Qs3AZukClZ0mD7G20PEXT4y2MIOoldcshgrT6WdkAL8"
  },

  // Navigation
  navItems: [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'experience', label: 'Experience', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'projects', label: 'Projects', icon: '🚀' },
    { id: 'creative', label: 'Creative', icon: '🎨' },
    { id: 'education', label: 'Education', icon: '🎓' },
    { id: 'contact', label: 'Contact', icon: '✉️' }
  ],

  // About Section
  about: {
    headline: "Building Intelligent Digital Experiences",
    description: "I'm a passionate Full Stack Developer with expertise in building modern web applications using React, Node.js, and MongoDB. I specialize in creating intelligent, user-centric applications that solve real-world problems.",
    bio: [
      "2+ years of experience in full-stack development",
      "Specialized in React and Node.js ecosystems",
      "Passionate about clean code and best practices",
    ]
  },

  // Experience Section
  experience: [
    {
      id: 1,
      company: "Software University, Bulgaria",
      position: "Student",
      period: "2020 - 2023",
      description: "Diploma in Software Engineering with a focus on JavaScript development. ",
      achievements: [
        "Built a couple of full-stack projects using JavaScript, React, Angular, Node.js, and MongoDB",
        "Received comprehensive training in web development, algorithms, and data structures",
        "Successfully completed multiple projects and assignments with high grades"
      ]
    }
  ],

  // Skills Section
  skills: {
    frontend: [
      { name: "React", level: 95, icon: "⚛️" },
      { name: "TypeScript", level: 80, icon: "📘" },
      { name: "Angular", level: 70, icon: "📦" },
      { name: "Next.js", level: 90, icon: "🚀" }
    ],
    backend: [
      { name: "Node.js", level: 90, icon: "🟢" },
      { name: "Express", level: 90, icon: "⚡" },
      { name: "MongoDB", level: 90, icon: "🍃" },
      { name: "REST APIs", level: 95, icon: "📡" }
    ],
    devops: [
      { name: "Docker", level: 80, icon: "🐳" },
      { name: "Vercel", level: 70, icon: "🌈" },
      { name: "CI/CD", level: 85, icon: "🔄" },
      { name: "Git", level: 85, icon: "📦" },
    ],
     grafik_design: [
      { name: "Photoshop", level: 90, icon: "🖼️" },
      { name: "Figma", level: 60, icon: "🎨" }
    ]
  },

  // Projects Section
  projects: [
    {
      id: 1,
      name: "Favorites",
      description: "Favorites is aplikation for bookmarking links. With features like Register, login, Favorites makes it easy to access and share important links whenever needed. It inkludes all crud operations, user authentication, and a user-friendly interface for managing your bookmarks.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      link: "https://favorites-client.vercel.app/",
      github: true,
      featured: true
    },
    {
      id: 2,
      name: "My-Shared-Blog",
      description: "Created with learning purpose. It includes all CRUD operations, Authentication, Autorization, // TO DO.. (Validation and Error handling not impemented yet!)",
      technologies: ["Angular", "TypeScript", "Firebase"],
      link: "https://simple-blog-beta-two.vercel.app/home",
      github: true,
      featured: true
    },
    {
      id: 3,
      name: "Helium Stats",
      description: "This App show statisticks for Hotspots on Helium Wallet Address. The pages/api directory is mapped to /api/*. Files in this directory are treated as API routes instead of React pages. They will be server-side only bundles and won't increase your client-side bundle size. API routes provide a solution to build your API with Next.js. You can write server-side code directly in these API routes, and it will be executed when the route is called.",
      technologies: ["Next.js"],
      link: "https://helium-stats.vercel.app/",
      github: true,
      featured: true
    }
  ],

  // Creative Section
  creative: [
    {
      id: 1,
      title: "Photography",
      description: "I have a passion for capturing moments and telling stories through my lens. I specialize in nature photography and have a growing portfolio of work that can be viewed online.",
      link: "https://500px.com/p/manataphotography?view=photos",
      image: "https://raw.githubusercontent.com/NikolayMantchev/cv/refs/heads/main/frontend/src/assets/photography.png",
      category: "Photography"
    },
    {
      id: 2,
      title: "Graphic Design",
      description: "",
      link: "https://www.behance.net/StudioManata",
      image: "https://raw.githubusercontent.com/NikolayMantchev/cv/refs/heads/main/frontend/src/assets/design.png",
      category: "Graphic Design"
    }
  ],

  // Education Section
  education: [
    {
      id: 1,
      institution: "Software University, Bulgaria",
      degree: "JavaScript Web Developer Diploma",
      period: "2020 - 2023",
      description: "Specialization in JavaScript and Web Technologies. Graduated with honors. Research focus on natural language processing.",
      gpa: "5.3/6.0"
    }
  ],

  // Certifications
  certifications: [
    {
      id: 1,
      name: "JS Fundamentals Certification",
      issuer: "Software University, Bulgaria",
      period: "2020",
      gpa: "6.0/6.0"
    },
    {
      id: 2,
      name: "JS Applications Certification",
      topics: ["Unit Testing and Modules", "Rest Services and AJAX", "Asynchronous Programming", "Remote Databases", "Templating", "Routing", "Workshop: Single Page Applications", "Design Patterns and Best Practices", "Project Architecture"],
      issuer: "Software University, Bulgaria",
      period: "2020",
      gpa: "6.0/6.0"
    },
    {
      id: 3,
      name: "React Developer Certification",
      topics: ["Intro to React and JSX", "Components: Basic Idea", "Components: Deep Dive", "Routing", "Forms", "React Hooks", "Advanced TTechniques"],
      issuer: "Software University, Bulgaria",
      period: "2021",
      gpa: "6.0/6.0"
    },
    {
      id: 4,
      name: "Angular Developer Certification",
      issuer: "Software University, Bulgaria",
      period: "2021",
      gpa: "5.06/6.0"
    },
     {
      id: 5,
      name: "JavaScript Backend Developer Certification",
      issuer: "Software University, Bulgaria",
      period: "2022",
      gpa: "5.13/6.0"
    }
  ],



  // Contact Section
  contact: {
    title: "Let's Work Together",
    subtitle: "Have a project in mind? I'd love to hear from you.",
    email: "nik.mantchev@gmail.com",
    form: {
      name: "Your Name",
      email: "your@email.com",
      subject: "Subject",
      message: "Your Message",
      submit: "Send Message",
      success: "Thank you for your message! I'll get back to you soon.",
      error: "Something went wrong. Please try again."
    }
  },

  // Social Links
  socialLinks: [
    { platform: "email", label: "Email", url: "mailto:nik.mantchev@gmail.com", icon: "✉️" },
    { platform: "github", label: "GitHub", url: "https://github.com/NikolayMantchev", icon: "💻" },
    { platform: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/nikolay-mantchev/", icon: "💼" },
    { platform: "website", label: "Website", url: "", icon: "🌐" }
  ],

  // Color Palette - Dark Techy Aesthetic
  colors: {
    background: "#0a0a0a",
    surface: "#121212",
    surfaceHighlight: "#1e1e1e",
    primary: "#6366f1", // Indigo
    secondary: "#8b5cf6", // Violet
    accent: "#06b6d4", // Cyan
    text: "#f1f5f9", // Light gray
    textSecondary: "#94a3b8", // Medium gray
    border: "#334155",
    glow: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)"
  },

  // Fonts
  fonts: {
    heading: "'Syne', 'Arial', sans-serif",
    body: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
    display: "'Syne', 'Arial', sans-serif"
  },

  // Animations
  animations: {
    duration: {
      fast: "0.3s",
      normal: "0.5s",
      slow: "0.8s"
    },
    easing: {
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
      bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    }
  }
}

export default CV_DATA