import React from "react";
import { CreateConferenceForm } from "./_components/new-conference";
import { ImageUpload } from "../../_components/image-upload";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CreateConferencePage = () => {
  return (
    <div className="">
      <div className="flex flex-col gap-6 md:flex-row w-full">
        <CreateConferenceForm />
       
      </div>
    </div>
  );
};

export default CreateConferencePage;
