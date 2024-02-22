import NavbarComponent from "@/components/homepage/NavbarComponent";
import React from "react";

export default function LayoutDetailReport({ children }) {
  return (
    <NavbarComponent
      backHeader={true}
      withNavButton={false}
      withMoreDropdown={false}
      withBottomNavbar={false}
      customBackground="bg-background border-b"
      backHeaderTitle="Report an issue"
      bgOnScroll="backdrop-blur-sm bg-gradient-to-b from-background/75"
    >
      <div className="container mt-20 py-4">{children}</div>
    </NavbarComponent>
  );
}
