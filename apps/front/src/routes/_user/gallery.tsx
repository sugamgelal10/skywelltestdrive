import VideoGallery from "@/components/pages/gallery/gallery";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/gallery")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <VideoGallery />
    </div>
  );
}
