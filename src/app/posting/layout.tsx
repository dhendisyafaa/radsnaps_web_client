import NavbarComponent from "@/components/homepage/NavbarComponent";

export default function PostingLayout({ children }) {
  return (
    <NavbarComponent
      backHeader={true}
      withNavButton={false}
      withMoreDropdown={false}
      withBottomNavbar={false}
      customBackground="bg-background"
      backHeaderTitle="Post your image"
      bgOnScroll="backdrop-blur-sm bg-gradient-to-b from-background/75"
    >
      <div className="container mt-20 py-4">{children}</div>
    </NavbarComponent>
  );
}
