import React from 'react';
import { FaGithub, FaLinkedin, FaGlobe, FaDocker, FaGitAlt, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdApi, MdBrush, MdCheck, MdBookmark, MdArticle, MdShowChart } from 'react-icons/md';
import {
  SiReact, SiTypescript, SiAngular, SiNextdotjs,
  SiNodedotjs, SiExpress, SiMongodb,
  SiVercel, SiGithubactions, SiFigma,
  SiHtml5
} from 'react-icons/si';
import {
  HiOutlineDesktopComputer, HiOutlineServer,
  HiOutlineColorSwatch, HiOutlineCloud, HiOutlineLightBulb
} from 'react-icons/hi';
import { BiTargetLock } from 'react-icons/bi';
import { RiRocketLine } from 'react-icons/ri';

export const ICON_MAP = {
  // Social / Contact
  email:    <MdEmail />,
  github:   <FaGithub />,
  linkedin: <FaLinkedin />,
  website:  <FaGlobe />,
  location: <MdLocationOn />,

  // Frontend skills
  html:       <SiHtml5 />,
  css:        <FaCss3Alt />,
  react:      <SiReact />,
  typescript: <SiTypescript />,
  angular:    <SiAngular />,
  nextjs:     <SiNextdotjs />,

  // Backend skills
  nodejs:   <SiNodedotjs />,
  express:  <SiExpress />,
  mongodb:  <SiMongodb />,
  restapi:  <MdApi />,

  // DevOps skills
  docker:  <FaDocker />,
  vercel:  <SiVercel />,
  cicd:    <SiGithubactions />,
  git:     <FaGitAlt />,

  // Design skills
  photoshop: <MdBrush />,
  figma:     <SiFigma />,

  // Skill category tabs
  tab_frontend: <HiOutlineDesktopComputer />,
  tab_backend:  <HiOutlineServer />,
  tab_design:   <HiOutlineColorSwatch />,
  tab_devops:   <HiOutlineCloud />,

  // About cards
  focus:      <BiTargetLock />,
  philosophy: <HiOutlineLightBulb />,
  mission:    <RiRocketLine />,

  // Projects
  bookmark: <MdBookmark />,
  article:  <MdArticle />,
  chart:    <MdShowChart />,

  // Misc
  check: <MdCheck />,
};

export const Icon = ({ name, className = '' }) => {
  const icon = ICON_MAP[name];
  if (!icon) return null;
  return <span className={`icon ${className}`}>{icon}</span>;
};
