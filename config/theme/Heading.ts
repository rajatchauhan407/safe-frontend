import { createStyle } from "@gluestack-style/react";
import { H1, H2, H3, H4, H5, H6 } from "@expo/html-elements";

export const Heading = createStyle({
  color: "$black",
  letterSpacing: "$sm",
  fontWeight: "$bold",
  fontFamily: "$heading",

  // Overrides expo-html default styling
  marginVertical: 0,
  _dark: {
    color: "$black",
  },
  variants: {
    isTruncated: {
      true: {
        props: {
          // @ts-ignore
          numberOfLines: 1,
          ellipsizeMode: "tail",
        },
      },
    },
    bold: {
      true: {
        fontWeight: "$bold",
      },
    },
    underline: {
      true: {
        textDecorationLine: "underline",
      },
    },
    strikeThrough: {
      true: {
        textDecorationLine: "line-through",
      },
    },
    sub: {
      true: {
        fontSize: "$xs",
        lineHeight: "$xs",
      },
    },
    italic: {
      true: {
        fontStyle: "italic",
      },
    },
    highlight: {
      true: {
        bg: "$safeGreen",
      },
    },
    size: {
      "5xl": {
        //@ts-ignore
        props: { as: H1 },
        fontSize: "$4xl",
        fontWeight: "$extrabold",
        lineHeight: "$6xl",
      },
      "4xl": {
        //@ts-ignore
        props: { as: H1 },
        fontSize: "$3xl",
        fontWeight: "$extrabold",
        lineHeight: "$5xl",
      },

      "3xl": {
        //@ts-ignore
        props: { as: H1 },
        fontSize: "$2xl",
        fontWeight: "$extrabold",
        lineHeight: "$4xl",
      },

      "2xl": {
        //@ts-ignore
        props: { as: H2 },
        fontSize: "$3xl",
        fontWeight: "$extrabold",
        lineHeight: "$4xl",
      },

      xl: {
        //@ts-ignore
        props: { as: H3 },
        fontSize: "$2xl",
        lineHeight: "$3xl",
      },

      lg: {
        //@ts-ignore
        props: { as: H4 },
        fontSize: "$xl",
        lineHeight: "$2xl",
      },

      md: {
        //@ts-ignore
        props: { as: H5 },
        fontSize: "$lg",
        lineHeight: "$lg",
      },

      sm: {
        //@ts-ignore
        props: { as: H6 },
        fontSize: "$md",
        lineHeight: "$lg",
      },

      xs: {
        //@ts-ignore
        props: { as: H6 },
        fontSize: "$sm",
        lineHeight: "$xs",
      },
    },
  },

  defaultProps: {
    size: "lg",
  },
});
