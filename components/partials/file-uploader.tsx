import React, { useState } from "react";

export default function FileUploader({
  helperFn = () => {},
}: {
  helperFn: (files: File[]) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    setFiles((prev) => {
      const _files = [...prev, ...Array.from(newFiles)];
      helperFn(_files);
      return _files;
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const _files = prev.filter((_, i) => i !== index);
      helperFn(_files);
      return _files;
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-200! rounded-2xl  bg-white">
      <div
        className="border-1 border-gray-200! border-dashed rounded-xl p-8 text-center cursor-pointer hover:border-gray-600"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => document.getElementById("fileInput")?.click()}
      >
        <span className="text-gray-500 text-xs">
          فایل مورد نظر خود را انتخاب کنید .
        </span>
        <input
          id="fileInput"
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div className="mt-4 space-y-3">
        {files.map((file, i) => (
          <div
            key={i}
            className="p-3 border border-gray-200! rounded-lg flex flex-col gap-2 bg-gray-50"
          >
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">{file.name}</span>
              <button
                className="text-red-600 text-sm"
                onClick={() => removeFile(i)}
              >
                حذف
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
