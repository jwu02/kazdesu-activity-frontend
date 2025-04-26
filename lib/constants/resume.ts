export const education = [
  {
    school: "The University of Sheffield",
    place: "Sheffield",
    qualification: "BSc Computer Science (2:1)",
    date: "2020 - 2023"
  },
  {
    school: "John Leggott College",
    place: "Scunthorpe",
    qualification: "A-Level Maths(A*), Computer Science(A) and Physics(A)",
    date: "2018 - 2020"
  },
  {
    school: "The St Lawrence Academy",
    place: "Scunthorpe",
    qualification: "GCSE Maths(9), Computer Science(7), Physics(7), Biology(7), Chemistry(8), Art and Design(8) and English(4)",
    date: "2013 - 2018"
  }
]

export const languages = [
  {
    name: "English",
    proficiency: "Native",
    value: 90
  },
  {
    name: "Mandarin",
    proficiency: "Heritage",
    value: 60
  },
  {
    name: "Cantonese",
    proficiency: "Heritage",
    value: 40
  },
  {
    name: "Japanese",
    proficiency: "Intermediate",
    value: 20
  },
  {
    name: "French",
    proficiency: "Intermediate",
    value: 20
  }
]

export const interests = [
  "Hardware",
  "Foreign Culture",
  "Languages",
  "Content Creation",
  "Online Marketing",
  "Self Improvement",
  "Psychology",
  "Gym",
]

export const projects = [
  {
    title: "PC Activity Monitoring",
    details: [
      "Developed a Python desktop app to track and monitor my PC activities (key presses, mouse clicks and movements).",
      "Activity data periodically published to serverless AWS Lambda functions via API Gateway, and stored in MongoDB.",
      "Activity data from Next.js personal website on the frontend, from serverless function APIs."
    ]
  },
  {
    title: "Obsdian Notes Force-Directed Graph",
    details: [
      "Utilized GitHub API to fetch my backed up Obsidian (note taking app) notes.",
      "Generated an interactive force-directed graph to visualize the connections between my notes, using D3.js. Integrated into personal website."
    ]
  },
  {
    title: "LeetInterview",
    details: [
      "A platform that facilitates answering common interview questions using both text and speech responses.",
      "Utilized Next.js and Tailwind CSS to create the front-end interface, incorporating shadcn/ui for customizable UI components.",
      "Created a REST API backend using Spring Boot to handle service requests.",
      "Leveraged the Backblaze B2 storage solution for user recordings."
    ]
  },
  {
    title: "Job Applications Tracker",
    details: [
      "Developed a Next.js application enabling users to manage and track all their job applications in a centralized location.",
      "Utilized Clerk for authentication and user management.",
      "Integrated Google Maps API for visualization of job applications data."
    ]
  },
];

export const skills = [
  "Strong programming skills in Python, Java, JavaScript/TypeScript",
  "Experience with other languages such as C++, Swift, PHP and Ruby",
  "Experience building mobile applications with Expo/React Native",
  "Experience with frontend technologies such as Next.js/React.js, Angular.js, Tailwind CSS and shadcn/ui",
  "Experience with building RESTful APIs with backend technologies such as Flask, Spring Boot and RubyOnRails",
  "Experience with AWS services such as Lambda, and API Gateway for building serverless applications",
  "Fundamental knowledge of machine learning, LLMs combined with RAG",
  "Ability to work independently and in a team environment, with agile practices",
  "Customer service experience working as a waiter and order processor",
]