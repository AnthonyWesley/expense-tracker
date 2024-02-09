import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="w-full z-30 fixed bottom-0 left-0 ">
      <div className="Container flex justify-center items-center gap-2 bg-appSecondaryColor rounded-md p-1 z-50 text-sm lg:text-xl">
        <Link
          className="hover:bg-appPrimaryColor transition duration-300 p-4 rounded-sm"
          to={"/records"}
          style={{
            backgroundColor: location.pathname == "/records" ? "#1f2937" : "",
          }}
        >
          REGISTROS
        </Link>
        <Link
          className="hover:bg-appPrimaryColor transition duration-300 p-4 rounded-sm"
          to={"/"}
          style={{ backgroundColor: location.pathname == "/" ? "#1f2937" : "" }}
        >
          HOME
        </Link>
        <Link
          className="hover:bg-appPrimaryColor transition duration-300 p-4 rounded-sm"
          to={"/record/detailed"}
          style={{
            backgroundColor:
              location.pathname == "/record/detailed" ? "#1f2937" : "",
          }}
        >
          DETALHADOS
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
