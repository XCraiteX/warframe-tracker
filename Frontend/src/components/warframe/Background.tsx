export default function Background() {
  return (
    <div className="flex fixed -z-50 h-screen w-full bg">
      <div className="flex w-full h-full backdrop-blur-sm bg-black/20"></div>
    </div>
  );
}
