import PATH from "@utils/routes/PATH";
import { Link } from "react-router-dom";

const CommonTopNav = () => {
  const navMenuList = [
    {
      content: "게임홈",
      linkTo: PATH.HOME,
      replace: false,
    },
    {
      content: "사진",
      linkTo: PATH.CAMERA_TEST,
      replace: false,
    },
    {
      content: "UI Preview",
      linkTo: "/ui",
      replace: false,
    },
  ];

  return (
    //
    <nav className="w-full bg-main text-main-contra px-8 py-4">
      <ul className="flex gap-4">
        {navMenuList.map((menu) => (
          <Link to={menu.linkTo} key={menu.content} replace={menu.replace}>
            <li>{menu.content}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default CommonTopNav;
