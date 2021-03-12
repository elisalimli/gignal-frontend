import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useCreateMessageMutation } from "../generated/graphql";
import { useGetIdFromUrl } from "../utils/hooks/useGetIdFromUrl";

interface Props {
  disableClick?: boolean;
}

const FileUpload: React.FC<Props> = ({ children, disableClick }) => {
  const [createMessage] = useCreateMessageMutation();
  const router = useRouter();

  const onDrop = useCallback(async (files) => {
    const channelId = useGetIdFromUrl(router.query.channelId);
    await createMessage({
      variables: { input: { channelId, text: null, file: files[0] } },
    });
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
        style: { ...style, minHeight: "100%" },
        onClick: handleOnClick,
      })}
    >
      <input {...getInputProps()} />
      {children}
    </div>
  );
};

export default FileUpload;
