import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

const FOLDER_ID = "1nu_uSCpvPFMUi4YRILrbUG2J0DmdRihP"; // 🔹 Replace with your folder ID
const API_KEY = "AIzaSyD542ky1IaxKObsQY3Mu3Cr4KZ4vkUpODY"; // 🔹 Replace with your API key

type DriveImage = {
  id: string;
  name: string;
  url: string;
  thumb?: string; // Optional thumbnail link
};

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<DriveImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  console.log(photos?.[0]?.url);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,thumbnailLink,webContentLink)`
        );
        const data = await res.json();

        if (data.files) {
          const images = data.files
            .filter((file: any) => file.mimeType.startsWith("image/"))
            .map((file: any) => ({
              id: file.id,
              name: file.name,
              //   url: `https://drive.google.com/uc?export=view&id=${file.id}`, // force direct image link
              url: `https://drive.google.com/uc?export=view&id=${file.id}`, // force direct image link
              thumb: file.thumbnailLink,
            }));

          setPhotos(images);
          console.log(images);
        }
      } catch (err) {
        console.error("Error fetching Drive photos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Photo Gallery
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore our collection of featured Photos
          </p>
        </div>

        {loading ? (
          <div className="text-center text-slate-600">Loading photos...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <Dialog key={photo.id}>
                <DialogTrigger>
                  <Card
                    className="group cursor-pointer overflow-hidden bg-white border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-0"
                    onClick={() => setSelectedImage(photo.url)}
                  >
                    <div className="relative aspect-square bg-slate-100 overflow-hidden">
                      <iframe
                        src={photo.url}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  {selectedImage && (
                    <div onClick={() => setSelectedImage(null)}>
                      <img
                        src={selectedImage}
                        alt="Selected photo"
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
