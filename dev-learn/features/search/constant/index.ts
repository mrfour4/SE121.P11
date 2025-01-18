import { Icons } from "@/components/icons";
import { Category } from "@prisma/client";

export const iconMap: Record<Category["name"], any> = {
    "Web Development Bootcamp": Icons.laptop,
    "Full Stack Web Developer": Icons.web,
    "Mastering Modern JavaScript": Icons.javascript,
    "React for Beginners": Icons.react,
    "Building Responsive Websites": Icons.css,
    "Vue.js Fundamentals": Icons.vue,
    "Node.js and Express.js": Icons.node,
    "Advanced Web Security": Icons.security,
    "Front-End Development Mastery": Icons.html,
    "Back-End Development with Python": Icons.python,
};
