"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import React, { use, useEffect } from "react";

const SearchComponent = () => {
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useQueryState("term", {
    defaultValue: "",
  });

  const router = useRouter();

  return (
    <div className="w-full md:w-1/2 flex items-center gap-5">
      <Input
        type="search"
        id="term"
        name="term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={() => router.push(`${pathname}?term=${searchTerm}`)}>
        <Search size={16} />
        Search
      </Button>
      <Button variant="outline" onClick={() => router.push(pathname)}>
        <X size={16} />
        Clear Search
      </Button>
    </div>
  );
};

export default SearchComponent;
