// "use client";
import NavbarComponent from "@/components/homepage/NavbarComponent";

export default function GalleryLayout({ children }) {
  return (
    <NavbarComponent>
      <div className="container mt-24 border">{children}</div>
      {/* {drawer} */}
    </NavbarComponent>
    // <>
    //   {drawer}
    //   {children}
    // </>
  );
}
