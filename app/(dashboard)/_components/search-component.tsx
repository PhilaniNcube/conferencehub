"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import React, { use, useEffect } from "react";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useQueryState("term", {
    defaultValue: "",
  });

  const router = useRouter();


  return (
    <div className="w-1/3 flex items-center gap-5">
      <Input
        type="search"
        id="term"
        name="term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={() => router.push(`/dashboard?term=${searchTerm}`)}>
        <Search size={16} />
        Search
      </Button>
    </div>
  );
};

export default SearchComponent;
