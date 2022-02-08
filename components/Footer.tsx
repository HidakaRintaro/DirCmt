import { ReactNode } from "react";

interface FooterProps {
  children?: ReactNode;
}

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <footer className="bg-gray-100 border-t-2">
      {children}
      <p className="text-center py-4">
        <small>&copy; 2022 HidakaRintaro</small>
      </p>
    </footer>
  );
};
