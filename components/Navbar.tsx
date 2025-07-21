import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="mx-auto flex w-full max-w-[1200px] flex-row items-center justify-between rounded-full bg-white p-4 px-10">
      <Link href="/">
        <p className="text-2xl font-bold bg-gradient-to-r from-[#AB8C95] to-[#8E97C5] bg-clip-text text-transparent">
          RESUMIND
        </p>
      </Link>
      <Link
        href="/upload"
        className="bg-gradient-to-b from-[#8e98ff] to-[#606beb] shadow-[0px_74px_21px_0px_#6678ef00] cursor-pointer rounded-full px-4 py-2 text-white w-fit"
      >
        上传简历
      </Link>
    </nav>
  );
};

export default Navbar;
