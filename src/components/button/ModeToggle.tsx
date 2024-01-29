// "use client";

// import { Button } from "@/components/ui/button";
// import { Moon, Sun } from "lucide-react";
// import { useTheme } from "next-themes";

// export function ModeToggle() {
//   const { theme, setTheme } = useTheme();

//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   return (
//     <Button variant="ghost" size="icon" onClick={toggleTheme}>
//       {theme === "dark" ? (
//         <Sun className="h-[1.2rem] w-[1.2rem]" />
//       ) : (
//         <Moon className="h-[1.2rem] w-[1.2rem]" />
//       )}
//     </Button>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("dark")}
        disabled={theme === "dark"}
      >
        <Moon className="h-[1.2rem] w-[1.2rem] " />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme("light")}
        disabled={theme === "light"}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] " />
      </Button>
    </div>
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button variant="ghost" size="icon">
    //       <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    //       <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    //       <span className="sr-only">Toggle theme</span>
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end">
    //     <DropdownMenuItem onClick={() => setTheme("light")}>
    //       Light
    //     </DropdownMenuItem>
    //     <DropdownMenuItem onClick={() => setTheme("dark")}>
    //       Dark
    //     </DropdownMenuItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
  );
}
