import CategoryInput from "./components/CategoryInput";
import CategoryList from "./components/CategoryList";

export default function index() {
  return (
    <section className="container w-full flex flex-col mx-auto lg:my-14 my-16 gap-2 p-2">
      <div className=" text-2xl">MINHAS CATEGORIAS</div>
      <CategoryInput />
      <CategoryList />
    </section>
  );
}
