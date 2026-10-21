import actorsAccessIcon from "@/assets/icons/actors-access.png";
import imdbIcon from "@/assets/icons/imdb.png";
import instagramIcon from "@/assets/icons/instagram.png";
import resumeImage from "@/assets/resume.png";

export const site = {
  bio: [
    [
      "",
      "Dominique Nieves",
      " is a Latina bi-coastal actress whose training includes The BGB Studio for Meisner, UCB for improv, Demetrius Angelo for action combat and The Ailey School for dance. She is a two-time Ivy League grad with real medical experience.",
    ],
    [
      "Her recent credits include ",
      "ABC The Rookie: Feds",
      " and ",
      "CBS FBI: Most Wanted",
      ".",
    ],
    [
      "She starred in the short film, A Nice Guy, which premiered at HBO's NY Latino Film Festival, and won her two best actress awards on the festival circuit.",
    ],
    [
      "She was named a BAFTA Breakthrough writer-director for the narrative film, Our Lady Lupe, produced in association with PBS. Nieves is the founder of Iron Glove Productions for which she writes, directs, and produces mission driven content.",
    ],
  ] as const,
  description: "Dominique Nieves is a Latina actress, writer and director.",
  email: "dominiquedanielleartist@gmail.com",
  name: "Dominique Nieves",
  resume: {
    // TODO: need alt txt
    image: { alt: "TODO: need alt txt", src: resumeImage },
    pdf: "/Dominique Nieves Resume.pdf",
  },
  socialLinks: [
    {
      href: "https://www.imdb.me/dominiquenieves",
      icon: { alt: "IMDb", src: imdbIcon },
      iconWidth: 25,
      label: "IMDb",
    },
    {
      href: "https://resumes.actorsaccess.com/DominiqueNieves",
      icon: { alt: "Actors Access", src: actorsAccessIcon },
      iconWidth: 29,
      label: "Actors Access",
    },
    {
      href: "https://www.instagram.com/dominique_didthat/",
      icon: { alt: "Instagram", src: instagramIcon },
      iconWidth: 18,
      label: "Instagram",
    },
  ],
  url: "https://dominiquenieves.com",
};
