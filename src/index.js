const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { PanelBody, TextControl, Button } = wp.components;
const { useState, useEffect } = wp.element;

registerBlockType("gutenberg-slideshow-block/slideshow", {
  title: "Custom Slideshow",
  icon: "images-alt",
  category: "media",

  attributes: {
    API_URL: {
      type: "string",
      default: "https://wptavern.com",
    },
    posts: {
      type: "array",
      default: [],
    },
  },

  edit: function ({ attributes, setAttributes }) {
    const { API_URL, posts } = attributes;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      fetch(`${API_URL}/wp-json/wp/v2/posts`)
        .then((response) => response.json())
        .then((data) => {
          setAttributes({ posts: data });
          setIsLoading(false);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [API_URL]);

    return (
      <div>
        <h1>Gutenberg Slidershow</h1>
      </div>
    );
  },

  save: function ({ attributes }) {
    const { posts } = attributes;

    return (
      <div
        className="slide-container"
        style={{ margin: "0!important", maxWidth: "none" }}
      >
        <ul className="slider">
          {posts.map((post, index) => (
            <li key={post.id} className="slide">
              <a href={post.link}>
                <img
                  className="post-thumb"
                  src={post.jetpack_featured_media_url}
                  alt={post.title.rendered}
                />
              </a>
              <div className="post-content">
                <a href={post.link}>
                  <h4 className="post-title">{post.title.rendered}</h4>
                </a>
                <p className="post-date">{post.date}</p>
              </div>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex" }}>
          <button className="prev-icon">
            <span class="dashicons dashicons-arrow-left-alt2"></span>
          </button>
          <button className="next-icon">
            <span class="dashicons dashicons-arrow-right-alt2"></span>
          </button>
        </div>
      </div>
    );
  },
});
