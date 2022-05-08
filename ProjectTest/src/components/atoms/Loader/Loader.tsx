import Lottie from 'react-lottie';
import animatedData from '@assets/lottie/loading.json'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animatedData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
};

const Loader = () => {
  return (
    <Lottie options={defaultOptions}
      height={200}
      width={200} />
  );
}

export default Loader