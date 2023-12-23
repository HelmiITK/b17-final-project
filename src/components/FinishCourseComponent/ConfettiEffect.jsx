import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export const ConfettiEffect = () => {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      className="z-50"
      width={width}
      height={height}
      numberOfPieces={500}
      recycle={false}
    />
  );
};
