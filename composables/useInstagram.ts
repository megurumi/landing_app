import type { Post } from "@/types/post";

export const useInstagram = () => {
  const hero: Post = {
    image: "img/creations/hero.png",
    caption: `
      ✨ Find free tutorials for all my creations on my YouTube channel: @megurumi_creative!
      (Link in bio, or DM me if you can't find it!)

      If you'd like to support my work and help me keep creating free content, any support means the world to me 💕
      Once tested and polished, my patterns are available in my Etsy shop, and some are already up!

      Thank you for following along and being part of my creative journey. Happy crocheting! 🧶💫
      `,
  };

  const posts: Post[] = [
    {
      key: "barnabe",
      image: "img/creations/barnabe.png",
      caption: `I’m so happy to announce the release of the Barnabé pattern! 🐋💙`,
      instaLink: "https://www.instagram.com/p/DJUaNUytTsx",
      etsyLink:
        "https://www.etsy.com/ca/listing/4298995429/barnabe-the-whale-crochet-pattern",
    },
    {
      key: "shelly",
      image: "img/creations/shelly.png",
      caption: `✨ Shelly the Turtle is here! 🐢 ✨`,
      instaLink: "https://www.instagram.com/p/DJJ6UVIt_Qp/",
      etsyLink: "https://www.etsy.com/ca/listing/1906170787/shelly-the-turtle-crochet-pattern",
    },
    {
      key: "kevin",
      image: "img/creations/kevin.png",
      caption: `
        Kevin is clearly a very versatile little guy!
        Depending on how you look at him, he can turn into a goose, a canary, or a chick 😄 (he’s got quite the range!).`,
      instaLink: "https://www.instagram.com/p/DJJ6UVIt_Qp/",
      etsyLink: "https://www.etsy.com/ca/listing/4302012705/kevin-the-chick-crochet-pattern",
    },
    {
      key: "lola",
      image: "img/creations/lola.png",
      caption: `
        Lola turned out just gorgeous in every single version! From bold to pastel, cotton to plush,
        each one has its own personality. ✨ I especially loved seeing all the different eyes you created!
        so unique and full of character! 😍
        `,
      instaLink: "https://www.instagram.com/p/DJ4MHazNc3q",
      etsyLink: "https://www.etsy.com/ca/listing/4305832049/lola-the-owl-crochet-pattern-amigurumi",
    },
    {
      key: "lenny",
      image: "img/creations/lenny.png",
      caption: `
        🎉 Lenny is Low Sew, and if you have the patience to make the 8 legs haha, the result will be worth it! 🐙😍
        `,
      instaLink: "https://www.instagram.com/p/DKuY9-1gXyw",
      etsyLink: "https://www.etsy.com/ca/listing/4313034236/lenny-the-octopus-crochet-pattern",
    },
    {
      key: "roxanne",
      image: "img/creations/roxanne.png",
      caption: `
        🦊 The color changes were a fun little challenge too, but you all handled them like pros and Roxanne
        looks amazing because of it! 😍
        `,
      instaLink: "https://www.instagram.com/p/DLKm4vrgts5",
      etsyLink: "https://www.etsy.com/ca/listing/4323125630/roxanne-the-red-panda-crochet-pattern",
    },
    {
      key: "marcus",
      image: "img/creations/marcus.png",
      caption: `
        From soft pastels to bold colors, Marcus really shines no matter what shades you choose!
        Some loved giving him kawaii eyes, others went for a more ghostly or dreamy look, and even those little
        “happy accidents” like lower ears made every version charming in its own way. 🐘
        `,
      instaLink: "https://www.instagram.com/p/DLuh3ylP4MB",
      etsyLink: "https://www.etsy.com/ca/listing/4330248020/marcus-the-elephant-crochet-pattern",
    },
    {
      key: "kimmie",
      image: "img/creations/kimmie.png",
      caption: `
        From furry yarn versions (hello, realistic mouse vibes 🐭✨), to colorful, classic, and even “field mouse” looks,
        each one brought their own personality to life.
      `,
      instaLink: "https://www.instagram.com/p/DMfgdTgzvR2",
      etsyLink: "https://www.etsy.com/ca/listing/4338959771/kimmie-the-mouse-crochet-pattern",
    },
    {
      key: "gordon",
      image: "img/creations/gordon.png",
      caption: `
        From a spooky zombie Gordon 🧟‍♂️, to a Frankenstein-inspired creature 🧠⚡️, to classic pink, brown, white piggies 🐷🤎🤍
        and even a stylish Gordon with a mini watermelon bag 🍉👜, each version was full of personality and charm.
      `,
      instaLink: "https://www.instagram.com/p/",
      etsyLink: "https://www.etsy.com/ca/listing/4347606426/gordon-the-pig-crochet-pattern-amigurumi",
    },
    {
      key: "ezra",
      image: "img/creations/ezra.png",
      caption: `
        From Spyro-inspired colors to icy blues, fiery reds, and even softer pastel shades, Ezra looks stunning
        in every version! Some experimented with eyelid placement, giving him expressions that ranged from his
        signature grumpy look to sleepy, fiery, dreamy, or even sweetly tired.
      `,
      instaLink: "https://www.instagram.com/p/DNyhWBWXgDY",
      etsyLink: "https://www.etsy.com/ca/listing/4357214323/ezra-the-dragon-crochet-pattern",
    },
    {
      key: "kissy",
      image: "img/creations/kissy.png",
      caption: `
        🦇 From classic black bats to purple, pastel, and colorful versions, every Kissy turned out absolutely adorable!
        Some went for embroidered eyes, some used felt, others chose bigger safety eyes ! and each gave Kissy her own
        unique charm. 🥰
      `,
      instaLink: "https://www.instagram.com/p/DNyhWBWXgDY",
      etsyLink: "https://www.etsy.com/ca/listing/4362532379/kissy-the-bat-crochet-pattern-amigurumi",
    },
  ];

  return {
    hero,
    posts,
  };
};
