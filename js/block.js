const { registerBlockType } = wp.blocks;

registerBlockType("gutenberg-slideshow-block/slideshow", {
  title: "Custom Slideshow",
  icon: "images-alt",
  category: "media",

  attributes: {},

  edit: function () {
    return <h1>Hello World!!</h1>
  },

  save: function () {
    return null;
  },
});
