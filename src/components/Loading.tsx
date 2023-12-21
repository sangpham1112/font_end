import { Spinner } from "flowbite-react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner color="info" aria-label="Info spinner example" />
    </div>
  );
};

export default Loading;
