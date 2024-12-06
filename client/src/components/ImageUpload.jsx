import React, { useState } from 'react';
import { Container, Button, Form, Spinner, Alert, Image } from 'react-bootstrap';
import './ImageUpload.css';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null); // For previewing the selected image
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [inferenceLoading, setInferenceLoading] = useState(false); // For inference loading state
  const [inferenceResult, setInferenceResult] = useState(null); // To store inference results
  const [processedFiles, setProcessedFiles] = useState([]); // List of processed files

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadSuccess(null); // Reset the success/error message when a new file is selected

    // Set preview URL for the selected image
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setPreviewURL(fileURL);
    } else {
      setPreviewURL(null); // Clear preview if no file is selected
    }
  };

  // Handle file upload
  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    setIsLoading(true);

    fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        setUploadSuccess(true);
        alert('File uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        setUploadSuccess(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Handle inference
  const handleInference = () => {
    setInferenceLoading(true);

    fetch('http://127.0.0.1:5000/run-inference', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Inference Result:', data);
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          setInferenceResult(data); // Set inference result
          alert('Inference completed successfully!');
          fetchProcessedFiles(); // Refresh processed files
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to run inference. Please try again.');
      })
      .finally(() => {
        setInferenceLoading(false);
      });
  };

  // Fetch list of processed files
  const fetchProcessedFiles = () => {
    fetch('http://127.0.0.1:5000/list-results')
      .then((response) => response.json())
      .then((data) => {
        console.log('Processed files:', data.files);
        setProcessedFiles(data.files);
      })
      .catch((error) => {
        console.error('Error fetching processed files:', error);
      });
  };

  // Handle file download
  const handleDownload = (filename) => {
    window.location.href = `http://127.0.0.1:5000/download/${filename}`;
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Upload an Image</h2>

      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Select Image</Form.Label>
          <Form.Control 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </Form.Group>

        {previewURL && (
          <div className="text-center mb-4">
            <Image src={previewURL} thumbnail alt="Selected preview" width={200} height={200} />
          </div>
        )}

        {uploadSuccess === true && (
          <Alert variant="success">File uploaded successfully!</Alert>
        )}

        {uploadSuccess === false && (
          <Alert variant="danger">Failed to upload file. Please try again.</Alert>
        )}

        <Button 
          variant="primary" 
          onClick={handleUpload} 
          disabled={isLoading}
          className="mt-3 me-3"
        >
          {isLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> Uploading...
            </>
          ) : (
            'Upload'
          )}
        </Button>

        <Button 
          variant="success" 
          onClick={handleInference} 
          disabled={inferenceLoading || !uploadSuccess} // Disable if no upload or inference is running
          className="mt-3 me-3"
        >
          {inferenceLoading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              /> Running Inference...
            </>
          ) : (
            'Run Inference'
          )}
        </Button>

        {processedFiles.length > 0 && (
          <div className="mt-4">
            <h5>Processed Files:</h5>
            <ul className="list-group">
              {processedFiles.map((file, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {file}
                  <Button
                    variant="primary"
                    className="btn-sm"
                    onClick={() => handleDownload(file)}
                  >
                    Download
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Form>
    </Container>
  );
};

export default ImageUpload;
