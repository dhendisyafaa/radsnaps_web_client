import NavbarComponent from "@/components/homepage/NavbarComponent";

export default function ProfileLayout({ children }) {
  return (
    <NavbarComponent>
      <div className="container mt-24 max-w-2xl mx-auto">{children}</div>
    </NavbarComponent>
  );
}
