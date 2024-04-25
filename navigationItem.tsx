import Link from "next/link";

interface NavProps {
  name: string;
  href: string;
  icon?: JSX.Element;
}

export default function NavigationItem({ name, href, icon }: NavProps) {
  return (
    <li className="w-full">
      <Link href={href} legacyBehavior>
        <a className="flex items-center justify-start w-full px-4 py-2 pl-12 text-white hover:bg-white hover:text-[#344966]">
          {icon && (
            <span className="mr-4 flex-shrink-0">
              {icon}
            </span>
          )}
          <span className="flex-grow">{name}</span>
        </a>
      </Link>
    </li>
  );
}
