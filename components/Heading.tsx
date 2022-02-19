interface HeadingProps {
  title: string
}

export const Heading: React.FC<HeadingProps> = ({ title }) => {
  return <h1 className="text-2xl font-bold sm:text-5xl">{title}</h1>
}
