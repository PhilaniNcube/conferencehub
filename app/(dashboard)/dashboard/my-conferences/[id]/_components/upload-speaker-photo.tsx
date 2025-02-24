"use client";

import React, { useState } from "react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ImagesIcon } from "lucide-react";
import { addPhotoToSpeaker } from "@/utils/db/actions/speakers";

interface Props {
  speakerId: string;
 
}

const UploadSpeakerPhoto = ({ speakerId }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const supabase = createClient();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      const file = e.target.files?.[0];
      if (!file) return;

      // Preview
      setPreview(URL.createObjectURL(file));

      // Upload
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const filePath = `${speakerId}-${Math.random()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from("speakers")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("speakers").getPublicUrl(filePath);

      addPhotoToSpeaker(speakerId,publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <ImagesIcon size={16} />
          Upload Profile Image
        </Button>
      </DialogTrigger>
      <DialogContent className="space-y-4">
        <DialogTitle>Upload Profile Image</DialogTitle>
        <div className="flex items-center gap-4">
          {preview && (
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
          )}
          <Label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            {uploading ? "Uploading..." : "Upload Photo"}
            <Input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </Label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </DialogContent>
    </Dialog>
  );
};

export default UploadSpeakerPhoto;
