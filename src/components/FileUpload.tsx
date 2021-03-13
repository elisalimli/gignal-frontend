import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useCreateMessageMutation } from "../generated/graphql";
import { useGetIdFromUrl } from "../utils/hooks/useGetIdFromUrl";

interface Props {
  disableClick?: boolean;
}

const FileUpload: React.FC<Props> = ({ children, disableClick }) => {
  const [createMessage] = useCreateMessageMutation();
  const router = useRouter();

  const onDrop = useCallback(async (files) => {
    console.log(files);
    const file = files[0];

    const channelId = useGetIdFromUrl(router.query.channelId);
    const res = await createMessage({
      variables: { input: { channelId, text: null, file } },
    });

    if (res.data.createMessage.errors) {
      res.data.createMessage.errors.map((error) => {
        if (error.field === "size") {
          toast.warn(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            pauseOnFocusLoss: true,
          });
        }
      });
    }
    console.log(res);
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
