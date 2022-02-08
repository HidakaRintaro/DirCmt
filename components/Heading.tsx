interface HeadingProps {
  title: string;
}

export const Heading: React.FC<HeadingProps> = ({ title }) => {
  return <h1 className="text-5xl font-bold">{title}</h1>;
};
