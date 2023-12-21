import NavBar from "./Navbar";
import FooterComponent from "./FooterComponent";

const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <NavBar />
      {children}
      <FooterComponent />
    </>
  );
};

export default Layout;
