import { formatSize } from "../lib/utils";
import Image from "next/image";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

// 20 MB
const maxFileSize = 20 * 1024 * 1024;

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;

      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "application/pdf": [".pdf"] },
    maxSize: maxFileSize,
  });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full from-light-blue-100 to-light-blue-200 rounded-2xl bg-gradient-to-b p-4">
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div
              className="flex items-center justify-between rounded-2xl bg-gray-50 p-3"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src="/images/pdf.png"
                alt="pdf"
                className="size-10"
                width={100}
                height={100}
              />
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                className="p-2 cursor-pointer"
                onClick={() => {
                  onFileSelect?.(null);
                }}
              >
                <Image
                  src="/icons/cross.svg"
                  alt="remove"
                  className="w-4 h-4"
                  width={100}
                  height={100}
                />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-2">
                <Image
                  src="/icons/info.svg"
                  alt="upload"
                  className="size-20"
                  width={100}
                  height={100}
                />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">点击上传文件</span>
                或直接拖入此处
              </p>
              <p className="text-lg text-gray-500">
                PDF (最大 {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
