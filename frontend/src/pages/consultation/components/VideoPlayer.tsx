
interface Props {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  isLocal?: boolean;
}

const VideoPlayer = ({
  videoRef,
  isLocal = false,
}: Props) => {
  return (
    <div className="relative w-full aspect-video rounded-md overflow-hidden bg-black shadow-md">
      <video
        ref={videoRef}
        className={`w-full h-full object-cover`}
        autoPlay
        playsInline
        muted={isLocal}
      />
    </div>
  );
};

export default VideoPlayer;