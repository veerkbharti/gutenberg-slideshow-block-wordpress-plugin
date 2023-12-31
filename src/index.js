import { registerBlockType } from "@wordpress/blocks";

import edit from "./edit";
import save from "./save";

registerBlockType("gutenberg-slideshow-block/slideshow", {
  title: "Custom Slideshow",
  icon: "images-alt",
  category: "media",

  attributes: {
    API_URL: {
      type: "string",
      default: "https://wptavern.com/wp-json/wp/v2/posts",
    },
    posts: {
      type: "array",
      default: [],
    },
    title: {
      type: "string",
      default: "Gutenberg Slideshow",
    },

    autoPlay: {
      type: "boolean",
      default: false,
    },

    infiniteLoop: {
      type: "boolean",
      default: true,
    },

    arrowButton: {
      type: "boolean",
      default: true,
    },

    isTitleShow: {
      type: "boolean",
      default: true,
    },

    isDescShow: {
      type: "boolean",
      default: true,
    },

    isDateShow: {
      type: "boolean",
      default: true,
    },
  },

  edit,

  save,
});
