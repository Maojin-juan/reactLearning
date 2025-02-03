import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import PropTypes from "prop-types";

import { useImageUpload } from "./hooks/useImageUpload";
import { useUrlInput } from "./hooks/useUrlInput";
import ImageUploadArea from "./components/ImageUploadArea";
import ImageGrid from "./components/ImageGrid";
import UrlInputForm from "./components/UrlInputForm";

const MultiImageUpload = ({ imagesUrl = [], onImagesChange }) => {
  const [error, setError] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const {
    images,
    handleDrop,
    handleFileUpload,
    removeImage,
    isDragging,
    setIsDragging,
    setImages,
  } = useImageUpload(imagesUrl, onImagesChange, setError);

  const { handleUrlSubmit, imageUrl, setImageUrl } = useUrlInput(
    imagesUrl,
    onImagesChange,
    setShowUrlInput,
    setError,
    setImages,
  );

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      <ImageUploadArea
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        handleDrop={handleDrop}
        handleFileUpload={handleFileUpload}
        setShowUrlInput={setShowUrlInput}
        showUrlInput={showUrlInput}
      >
        {showUrlInput && (
          <UrlInputForm
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleUrlSubmit={handleUrlSubmit}
            setShowUrlInput={setShowUrlInput}
          />
        )}

        <ImageGrid
          images={images}
          removeImage={removeImage}
          showUrlInput={showUrlInput}
          setShowUrlInput={setShowUrlInput}
        />
      </ImageUploadArea>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="whitespace-pre-line">
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

MultiImageUpload.propTypes = {
  imagesUrl: PropTypes.arrayOf(PropTypes.string).isRequired,
  onImagesChange: PropTypes.func.isRequired,
};

export default MultiImageUpload;
