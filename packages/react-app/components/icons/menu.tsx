import Link from "next/link";

const Menu = () => {
  return (
    <Link href="/dashboard" className="w-6 h-6 text-base-100 md:hidden">
      Dashboard
    </Link>
  );
};
export default Menu;
