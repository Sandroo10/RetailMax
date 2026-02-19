import { container, message } from "./LoadingFallback.styles";

const LoadingFallback = () => {
  return (
    <div className={container()}>
      <p className={message()}>Loading...</p>
    </div>
  );
};

export default LoadingFallback;
