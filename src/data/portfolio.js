import { personal } from "./personal";
import { assets } from "./assets";
import { skills } from "./skills";
import { projects } from "./projects";
import { journey } from "./journey";

export { skills, projects, journey };

export const portfolio = {
  ...personal,
  ...assets,
  title: personal.title,
  motivation: personal.about,
  interests: `${personal.strengths} ${personal.goal}`,
  social: {
    github: personal.github,
    linkedin: personal.linkedin,
  },
};
