import React, { useCallback } from "react";
import Dropzone, { useDropzone } from "react-dropzone";

interface Props {
  disableClick?: boolean;
}

const FileUpload: React.FC<Props> = ({ children, disableClick }) => {
  const onDrop = useCallback((files) => {
    console.log("files", files);
  }, []);

  const handleOnClick = useCallback((e) => {
    if (disableClick) {
      e.stopPropagation();
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const outlineStyle = isDragActive
    ? {
        outlineColor: "lightgray",
        outlineStyle: "dashed",
      }
    : {};

  const disableClickStyle =
    disableClick && !isDragActive ? { outline: "none" } : {};
  const style = { ...outlineStyle, ...disableClickStyle };

  return (
    <div
      {...getRootProps({
        style: { ...style, height: "100%" },
        onClick: handleOnClick,
      })}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default FileUpload;
