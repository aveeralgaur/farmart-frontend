import { useState } from "react";
import GetLinks from "../GetLinks";
import axios from "axios";

const Home = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState("");
  const [link, setLink] = useState(null);

  const handleUpload = (event) => {
    const selectedFile = event.target.files[0];

    const postData = new FormData();
    postData.append("file", selectedFile);
    axios
      .post("http://localhost:3002/farmart/uploadFile", postData)
      .then((response) => {
        setLink(response?.data);
        setError("");
      })
      .catch((error) => {
        setLink(null);
        setError(error);
      });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/zip",
      ];
      const maxFileSizeInBytes = 5 * 1024 * 1024;

      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorMessage(
          "Invalid file type. Only JPG, JPEG, PNG and ZIP files are allowed."
        );
      } else if (selectedFile.size > maxFileSizeInBytes) {
        setErrorMessage("File size exceeds the limit of 5 MB.");
      } else {
        setErrorMessage("");
        setUploadedFile(selectedFile);
        const postData = new FormData();
        postData.append("file", selectedFile);
        axios
          .post("http://localhost:3002/farmart/uploadFile", postData)
          .then((response) => {
            setLink(response?.data);
            setError("");
          })
          .catch((error) => {
            setLink(null);
            setError(error);
          });
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-start items-start">
      <div>
        <h1 className="pb-4 font-semibold">Upload File:</h1>
        {!uploadedFile && (
          <input
            type="file"
            onChange={handleFileChange}
            accept=".jpg, .jpeg, .png, .zip"
            className="border p-2"
          />
        )}
        <p className="text-red-500">{errorMessage}</p>
      </div>
      {uploadedFile && (
        <div>
          <input
            type="file"
            onChange={handleUpload}
            accept=".jpg, .jpeg, .png, .zip"
            className="border p-2"
          />
        </div>
      )}
      {link && (
        <a
          href={link}
          className="hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link}
        </a>
      )}
      <GetLinks />
    </div>
  );
};

export default Home;
