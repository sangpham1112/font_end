import { Footer } from "flowbite-react";

const FooterComponent: React.FC = () => {
  return (
    <Footer
      container={true}
      className="border-t-[1px] mt-3 flex justify-center">
      <Footer.Copyright by="SangStore" year={2024} />
    </Footer>
  );
};

export default FooterComponent;
