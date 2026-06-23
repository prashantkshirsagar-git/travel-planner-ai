import React, { useEffect } from "react";
import { Button } from "../button";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <Button variant="outline" className="rounded-full">
              My Trips
            </Button>

            <img src={user?.picture} className="h-8.75 w-8.75 rounded-full" />
            
          </div>
        ) : (
          <Button>Sign In</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
