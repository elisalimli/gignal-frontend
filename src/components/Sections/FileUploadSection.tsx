import React from "react";
import Button from "../Button";
import FileUpload from "../FileUpload";
import PlusIcon from "../icons/PlusIcon";

interface Props {}

const FileUploadSection: React.FC<Props> = () => {
  return (
    <FileUpload>
      <Button
        borderRadius="md"
        extraClassName="mr-1 py-2"
        type="button"
        variant="icon"
        loading={false}
        padding="py-1 px-3"
        width="3%"
      >
        <PlusIcon className="w-6 h-6" />
      </Button>
    </FileUpload>
  );
};

export default FileUploadSection;
