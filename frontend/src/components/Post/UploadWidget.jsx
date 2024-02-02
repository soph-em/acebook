import { useEffect, useRef } from "react";

const UploadWidget = ({ onImageUpload }) => {
  const cloudinaryRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;

    // Initialize Cloudinary Widget
    const widget = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dzkvzncgr", // Cloudinary cloud name
        uploadPreset: "acebook", // Cloudinary upload preset
        multiple: false,
        sources: ["local", "url", "camera", "facebook", "google_drive"],
      },
      (error, result) => {
        console.log(result);
        if (!error && result && result.event === "success") {
          // Handle successful image upload
          const imageUrl = result.info.secure_url;
          onImageUpload(imageUrl);
        }
      }
    );

    // Attach event listener to open the widget when the component mounts
    document.getElementById("upload-button").addEventListener("click", () => {
      widget.open();
    });

    // Cleanup the event listener when the component unmounts
    return () => {
      // Cleanup the widget when the component unmounts
      widget.destroy();
    };
  }, [onImageUpload]);

  return (
    <div>
      <button
        className="bg-blue-400 text-white py-1 px-4 rounded-md hover:bg-blue-700"
        id="upload-button"
      >
        Upload Image
      </button>
    </div>
  );
};

export default UploadWidget;
