"use client";

import WorkCasePage, { WorkCaseData } from "@/components/work/WorkCasePage";

const data: WorkCaseData = {
  // Hero
  heroTags: ["EdTech", "Language Learning", "App Design", "AI Speaking Coach"],
  heroTitle: "ToeicPal",
  heroSubtitle:
    "Speaking platform designed to guide how people actually learn and improve.",
  heroImage: "/work/speakingpal.png",
  heroImageAlt: "A TOEIC ToeicPal speaking platform",
  heroObjectPosition: "top center",

  // Overview
  overviewHeading: "Built to simulate the exam while strengthening real communication skills",
  overviewBody: [
    "ToeicPal helps learners prepare with more structure, clarity, and confidence. Instead of relying on repetitive drills and generic exercises, the platform guides users through each TOEIC Speaking task with practical strategies, clear feedback, and focused practice designed around how real improvement happens.",
    "From full TOEIC Speaking test simulations and instant scoring to AI-powered speaking sessions and personalized practice plans, ToeicPal gives learners the tools to improve both their test performance and their ability to communicate naturally in professional, everyday situations.",
  ],
  metaItems: [
    { label: "Client", value: "ToeicPal" },
    { label: "Industry", value: "EdTech · Language Learning" },
    { label: "Year", value: "2024" },
  ],

  // Gallery
  gallery: [
    { src: "/work/atoeic-2.png", alt: "A TOEIC ToeicPal — speaking session" },
    { src: "/work/atoeic-3.png", alt: "A TOEIC ToeicPal — test simulation" },
  ],

  // What We Did
  whatWeDidHeading: "Design built around how language learners actually improve",
  deliverables: [
    {
      num: "01",
      title: "Product Strategy",
      desc: "Mapped the learner journey from first open to exam confidence, identifying where existing tools failed and where ToeicPal could deliver meaningful differentiation.",
    },
    {
      num: "02",
      title: "App Design",
      desc: "Designed the full native app across iOS and Android — information architecture, component library, and a visual language that feels focused and encouraging, not clinical.",
    },
    {
      num: "03",
      title: "Onboarding Flow",
      desc: "Created an onboarding that quickly surfaces each learner's goal and current level, so the platform can personalise practice plans from the first session.",
    },
    {
      num: "04",
      title: "Speaking Practice Experience",
      desc: "Designed the core practice loops — prompt delivery, recording UI, and instant AI feedback — to feel like a real coaching session, not a test.",
    },
    {
      num: "05",
      title: "Test Simulation",
      desc: "Built a full TOEIC Speaking test simulation mode with timed tasks and authentic scoring, so learners know exactly where they stand before exam day.",
    },
    {
      num: "06",
      title: "Progress & Feedback System",
      desc: "Designed the progress tracking and feedback layer, making improvement visible and connecting daily practice to real score gains over time.",
    },
  ],

  // More Work
  moreWork: [
    {
      client: "DAZN",
      title: "Premium Sports Platform Redesign",
      tags: ["Web Design & Development", "App Design", "TV App", "Brand Design"],
      image: "/work/dazn.png",
      href: "/work/dazn",
    },
    {
      client: "Designrr",
      title: "Engagement & Retention Overhaul",
      tags: ["Web Design & Development"],
      image: "/work/designrr.png",
      href: "/work/designrr",
    },
  ],
};

export default function AToeicCaseStudy() {
  return <WorkCasePage data={data} />;
}
