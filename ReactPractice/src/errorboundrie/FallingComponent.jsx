import { useState } from "react";

const FallingComponent = () => {
  const [hasError, setHasError] = useState(false);

  const fetchData = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error("API request failed");
    } catch (error) {
      console.error(error);
      setHasError(true);
    }
  };

  if (hasError) {
    throw new Error("Rendering failed after API error");
  }

  return (
    <div>
      <h2>Falling Component</h2>

      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default FallingComponent;
