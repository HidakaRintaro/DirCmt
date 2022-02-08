import { FileAddIcon } from "../icons/FileAddIcon";
import { FolderAddIcon } from "../icons/FolderAddIcon";
import { Button } from "./IconButton";

interface DirSectionProps {}

export const DirSection: React.FC<DirSectionProps> = (props) => {
  return (
    <div className="drop-shadow-lg  py-2 px-4 h-96 divide-y-2 divide-gray-300 bg-white rounded-lg  mx-auto">
      <div className="flex gap-3 mb-2">
        <Button
          icon={<FolderAddIcon className="stroke-white stroke-2" />}
          value="Folder"
        />
        <Button
          icon={<FileAddIcon className="stroke-white stroke-2" />}
          value="File"
        />
      </div>
      <div>folder</div>
    </div>
  );
};
