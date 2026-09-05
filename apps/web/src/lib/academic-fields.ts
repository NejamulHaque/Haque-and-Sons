export interface DegreeOption {
  id: string;
  label: string;
  shortLabel: string;
  category: "Undergraduate" | "Postgraduate" | "Diploma / Associate" | "Other";
  branches: string[];
}

export const ACADEMIC_DEGREES: DegreeOption[] = [
  {
    id: "B.Tech",
    label: "B.Tech / B.E. (Bachelor of Technology)",
    shortLabel: "B.Tech",
    category: "Undergraduate",
    branches: [
      "Computer Science & Engineering (CSE)",
      "CSE - Artificial Intelligence & Machine Learning (AI/ML)",
      "CSE - Data Science & Analytics",
      "CSE - Cyber Security & Forensics",
      "CSE - Cloud Computing & DevOps",
      "CSE - Internet of Things (IoT)",
      "Information Technology (IT)",
      "Electronics & Communication Engineering (ECE)",
      "Electrical & Electronics Engineering (EEE)",
      "Mechanical Engineering (ME)",
      "Civil Engineering (CE)",
      "Robotics & Automation",
      "Software Engineering",
    ],
  },
  {
    id: "M.Tech",
    label: "M.Tech / M.E. (Master of Technology)",
    shortLabel: "M.Tech",
    category: "Postgraduate",
    branches: [
      "Computer Science & Engineering (CSE)",
      "Artificial Intelligence & Machine Learning",
      "Data Science & Big Data Systems",
      "Information & Cyber Security",
      "Software Engineering & Architecture",
      "VLSI & Embedded Systems",
    ],
  },
  {
    id: "BCA",
    label: "BCA (Bachelor of Computer Applications)",
    shortLabel: "BCA",
    category: "Undergraduate",
    branches: [
      "General Computer Applications",
      "Full-Stack Web & App Development",
      "Cloud Computing & DevOps",
      "Data Science & Analytics",
      "Cyber Security & Ethical Hacking",
      "Artificial Intelligence & Machine Learning",
    ],
  },
  {
    id: "MCA",
    label: "MCA (Master of Computer Applications)",
    shortLabel: "MCA",
    category: "Postgraduate",
    branches: [
      "Enterprise Software Systems",
      "Cloud Architecture & DevOps",
      "Artificial Intelligence & Data Science",
      "Cybersecurity & Threat Defense",
      "Full-Stack Software Engineering",
      "General Computer Applications",
    ],
  },
  {
    id: "B.Sc",
    label: "B.Sc (Bachelor of Science - CS / IT / Data)",
    shortLabel: "B.Sc",
    category: "Undergraduate",
    branches: [
      "Computer Science (B.Sc CS)",
      "Information Technology (B.Sc IT)",
      "Data Science & Statistics",
      "Mathematics & Computing",
      "Electronics & Hardware",
    ],
  },
  {
    id: "M.Sc",
    label: "M.Sc (Master of Science - CS / IT / Data)",
    shortLabel: "M.Sc",
    category: "Postgraduate",
    branches: [
      "Computer Science (M.Sc CS)",
      "Information Technology (M.Sc IT)",
      "Data Science & Analytics",
      "Artificial Intelligence",
    ],
  },
  {
    id: "Diploma",
    label: "Diploma / Polytechnic (3-Year Technical)",
    shortLabel: "Diploma",
    category: "Diploma / Associate",
    branches: [
      "Diploma in Computer Engineering",
      "Diploma in Information Technology",
      "Diploma in Electronics & Communication",
      "Diploma in Electrical Engineering",
    ],
  },
  {
    id: "Other",
    label: "Other Technical Field / Self-Taught",
    shortLabel: "Other",
    category: "Other",
    branches: [
      "Self-Taught Software Developer",
      "Non-CS Engineering Background",
      "Other Technical Discipline",
    ],
  },
];

export const GRADUATION_YEARS = [
  "2024",
  "2025",
  "2026",
  "2027",
  "2028",
  "2029",
  "2030",
  "Graduate / Alumni",
];

export function getBranchesForDegree(degreeId: string): string[] {
  const match = ACADEMIC_DEGREES.find(
    (d) =>
      d.id.toLowerCase() === degreeId.toLowerCase() ||
      d.shortLabel.toLowerCase() === degreeId.toLowerCase() ||
      degreeId.toLowerCase().startsWith(d.id.toLowerCase())
  );
  return match ? match.branches : ACADEMIC_DEGREES[0].branches;
}

export function formatFullDegree(degree: string, branch: string): string {
  if (!degree && !branch) return "B.Tech Computer Science";
  if (!branch || branch === "General") return degree;
  if (branch.startsWith(degree)) return branch;
  return `${degree} (${branch})`;
}
