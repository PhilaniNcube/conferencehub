"use client";

import type React from "react";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function ImageUpload({ conference_id }: { conference_id: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast("No file selected");
      return;
    }

    setUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error, data } = await supabase.storage
        .from("conferences")
        .upload(fileName, file);

      if (error) {
        throw error;
      }
      console.log(data);

      //update the conference with the image url
      const imageUpload = await supabase
        .from("conferences")
        .update({ image_url: data.fullPath })
        .eq("id", conference_id)
        .single();

      if (imageUpload.error) {
        throw new Error("Error updating conference with image url");
      }

      setImageUrl(data.fullPath);

      toast("Image uploaded successfully");
    } catch (error) {
      toast("Error uploading file");
      console.error("Error uploading file:", error);
    } finally {
      setUploading(false);
      setFile(null);
      router.refresh();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="image">Conference Image</Label>
        <Input
          id="image"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
      </div>
      <Button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </Button>
      {imageUrl && (
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${imageUrl}`}
          alt="Conference Image"
          className="w-full object-cover mt-4"
        />
      )}
    </div>
  );
}
