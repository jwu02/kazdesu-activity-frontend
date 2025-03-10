import Link from 'next/link';

const Navbar = () => {
  const commonLinkStyles = "text-lg hover:text-background hover:bg-foreground hover:cursor-pointer transition-all duration-100 px-2 py-1";

  const links = [
    { name: "home", link: "/" },
    { name: "blog", link: "/blog" },
    { name: "projects", link: "/projects" },
  ];

  return (
    <div className="flex text-foreground gap-5 border-b-2 border-foreground">
      {links.map((link, index) => (
        <Link key={index} href={link.link} className={commonLinkStyles}>
          {link.name}
        </Link>
      ))}
    </div>
  );
}

export default Navbar