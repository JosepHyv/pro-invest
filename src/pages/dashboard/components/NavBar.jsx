import react from "react";
import { Navbar } from "keep-react";

const NavBar = () => {
  return (
    <header className="bg-slate-200 border shadow-lg  w-screen">
      <Navbar fluid={true}>
        <Navbar.Container className="flex items-center">
          <Navbar.Brand>Pro Invest</Navbar.Brand>
          <Navbar.Divider></Navbar.Divider>
          <Navbar.Container
            tag="ul"
            className="lg:flex hidden items-center justify-between gap-8"
          >
            <Navbar.Link linkName="Simular Inversion" />
            <Navbar.Link linkName="Invertir Ahora" />
            <Navbar.Link linkName="Mi Inversion" />
          </Navbar.Container>
        </Navbar.Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
