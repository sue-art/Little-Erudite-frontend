import { TailSpin } from "react-loader-spinner";

const LoaderComp = () => {
  return (
    <div className="max-auto">
      <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
        <TailSpin
          height="80"
          width="80"
          color="#189198"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
};
export default LoaderComp;
