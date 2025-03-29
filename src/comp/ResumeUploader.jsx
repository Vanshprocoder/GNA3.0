import React, { useState, useRef } from 'react';
import { X, Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFile = (file) => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const maxSize = 10 * 1024 * 1024;
    
    if (!allowedTypes.includes(file.type)) {
      return 'Please upload PDF or DOCX files only';
    }
    
    if (file.size > maxSize) {
      return 'File size should be less than 10MB';
    }
    
    return '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelection(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFileSelection(selectedFile);
    }
  };

  const handleFileSelection = (selectedFile) => {
    setError('');
    setUploadSuccess(false);
    
    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (!file) {
      setError('Please select a file first');
      return;
    }
    setTimeout(() => {
      setUploadSuccess(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-between items-center border-b p-4">
          <h3 className="text-lg font-semibold">Upload Your Resume</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={() => setFile(null)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {!uploadSuccess ? (
            <>
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${
                  isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                } ${error ? 'border-red-300 bg-red-50' : ''} transition-colors`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
              >
                <input 
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                />
                <FileText className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                {file ? (
                  <div className="mt-2">
                    <p className="font-medium text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {file.type.includes('pdf') ? 'PDF' : 'DOCX'} • {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="font-medium text-gray-800 mb-1">
                      Drag & drop your resume here or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports PDF, DOCX (max 10MB)
                    </p>
                  </>
                )}
              </div>
              {error && (
                <div className="mt-3 text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {error}
                </div>
              )}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleUpload}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center ${
                    !file ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={!file}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Resume
                </button>
              </div>
            </>
          ) : (
            <div className="py-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Upload Successful!</h3>
              <p className="text-gray-600 mb-6">Your resume has been uploaded successfully.</p>
              <button
                onClick={() => setFile(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeUploader;
