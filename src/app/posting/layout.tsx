import NavbarComponent from "@/components/homepage/NavbarComponent";

export default function PostingLayout({ children }) {
  return (
    <NavbarComponent>
      <div className="container mt-24">{children}</div>
    </NavbarComponent>
  );
}
