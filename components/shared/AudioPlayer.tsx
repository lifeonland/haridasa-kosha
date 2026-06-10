export function AudioPlayer({ src, title }: { src: string, title: string }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="font-semibold mb-2">{title}</h3>
      <audio controls src={src} className="w-full">
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
