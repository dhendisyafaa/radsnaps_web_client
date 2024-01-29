import NavbarComponent from "@/components/homepage/NavbarComponent";

export default function AlbumLayout({ children }) {
  return (
    <NavbarComponent>
      <div className="container">{children}</div>
    </NavbarComponent>
  );
}
