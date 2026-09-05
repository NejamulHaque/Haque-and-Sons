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

// Comprehensive graduation years up to 2050 + past years
export const GRADUATION_YEARS: string[] = [
  ...Array.from({ length: 2050 - 2024 + 1 }, (_, i) => String(2024 + i)),
  "2023",
  "2022",
  "2021",
  "2020",
  "2019",
  "2018",
  "Earlier Graduate / Alumni",
];

export interface PasswordStrengthResult {
  score: number; // 0 to 100
  label: "Very Weak" | "Weak" | "Fair" | "Good" | "Strong";
  color: string;
  isStrong: boolean;
  checks: {
    minLength: boolean; // >= 8 chars
    hasUppercase: boolean; // [A-Z]
    hasLowercase: boolean; // [a-z]
    hasNumber: boolean; // [0-9]
    hasSpecial: boolean; // [!@#$%^&*(),.?":{}|<>]
  };
}

export function checkPasswordStrength(password: string): PasswordStrengthResult {
  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };

  const passedCount = Object.values(checks).filter(Boolean).length;

  let score = 0;
  if (password.length > 0) {
    score = (passedCount / 5) * 80;
    if (password.length >= 12) score += 20;
    else if (password.length >= 10) score += 10;
  }
  score = Math.min(100, Math.round(score));

  let label: PasswordStrengthResult["label"] = "Very Weak";
  let color = "bg-red-500";

  if (passedCount <= 1) {
    label = "Very Weak";
    color = "bg-red-500";
  } else if (passedCount === 2) {
    label = "Weak";
    color = "bg-orange-500";
  } else if (passedCount === 3) {
    label = "Fair";
    color = "bg-amber-400";
  } else if (passedCount === 4) {
    label = "Good";
    color = "bg-blue-400";
  } else if (passedCount === 5) {
    label = "Strong";
    color = "bg-emerald-400";
  }

  return {
    score,
    label,
    color,
    isStrong: checks.minLength && checks.hasUppercase && checks.hasLowercase && checks.hasNumber,
    checks,
  };
}

export function isValidEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

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

