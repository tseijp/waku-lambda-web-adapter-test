"use client";

import Button from "./atoms/Button";
import Form, { FormActionResponse } from "./atoms/Form";
import { Blobs } from "@/_server/models/blobs";
import React, { useRef } from "react";

interface UploadButtonProps extends React.HTMLProps<HTMLFormElement> {
  plus?: boolean;
  _action: (formData: FormData) => Promise<FormActionResponse>;
}

export function UploadButton(props: UploadButtonProps) {
  const { children, className, plus, _action, ...formProps } = props;
  const formRef = useRef<HTMLFormElement>(null!);
  const inputRef = useRef<HTMLInputElement>(null!);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = () => {
    formRef.current.requestSubmit();
    inputRef.current.value = "";
  };

  return (
    <Form _action={_action} ref={formRef} {...formProps}>
      <input
        ref={inputRef}
        name="file"
        type="file"
        className="hidden"
        onChange={handleChange}
      />
      <Button plus={plus} className={className} onClick={handleClick}>
        {children}
      </Button>
    </Form>
  );
}

interface DeleteButtonProps extends React.HTMLProps<HTMLButtonElement> {
  blobId: number;
  _action: (id: number) => Promise<FormActionResponse>;
}

export function DeleteButton(props: DeleteButtonProps) {
  const { blobId, _action, ...buttonProps } = props;

  const handleClick = async () => {
    if (!window.confirm("削除しますか？")) return;
    const res = await _action(blobId);
    if (res.statusCode === 200) {
      alert("削除しました");
      window.location.pathname = "/media";
    }
  };

  return <Button {...buttonProps} type="button" onClick={handleClick} />;
}

interface FilePreviewProps extends React.HTMLProps<HTMLImageElement> {
  blob: Blobs;
}

export function FilePreview(props: FilePreviewProps) {
  const { blob, className } = props;

  if (blob.file_type.startsWith("image/"))
    return (
      <img
        src={`data:${blob.file_type};base64,${blob.file_data}`}
        alt={blob.file_name}
        className={`object-cover rounded ${className}`}
      />
    );
  return null;
}
