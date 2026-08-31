import loadingIcon from "../assets/images/icon-loading.svg";

export default function LoadingState() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#02012c] text-white">
      <img
        src={loadingIcon}
        alt=""
        className="size-12 animate-spin"
      />

      <p className="mt-4 text-lg">Loading weather...</p>
    </div>
  );
}
