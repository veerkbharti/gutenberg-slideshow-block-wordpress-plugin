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
  },

  edit,

  save,
});
