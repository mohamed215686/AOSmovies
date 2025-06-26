import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidCameraMovie } from "react-icons/bi";
import {FaHome,FaSearch } from "react-icons/fa";

export const navigation=[
    {
      label : "TV shows",
      href : 'tv',
      icon:<PiTelevisionFill />
    },
    {
      label : "Movies",
      href : 'movie',
      icon:<BiSolidCameraMovie />
    }
  ]
export const mobileNavigation=[
  {
    label: 'Home',
    href: '/',
    icon:<FaHome/>
  },
  ...navigation,
  {
    label:'Search',
    href: '/search',
    icon: <FaSearch />
  }
]