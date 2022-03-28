import React from "react";

interface ImageInputProps {
  inputProps: {
    id: string;
    name: string;
    onBlur: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  onRemove: () => void;
}

function ImageInput(props: ImageInputProps) {
  return (
    <>
      <input type="file" {...props.inputProps} />
    </>
  );
}

export default ImageInput;
