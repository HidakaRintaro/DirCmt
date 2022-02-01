import { NextPage } from "next";

interface HeadingProps {
  title: string;
}

export const Heading: NextPage<HeadingProps> = ({ title }) => {
  return <h1 className="text-5xl font-bold">{title}</h1>;
};
