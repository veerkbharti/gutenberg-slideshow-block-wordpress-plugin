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
        <div className="slideshow">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div>
              {posts.map((post) => (
                <div key={post.id} className="slide">
                  <img
                    src={post.jetpack_featured_media_url}
                    alt={post.title.rendered}
                  />
                  <h2>{post.title.rendered}</h2>
                  <p>{post.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },

  save: function ({ attributes }) {
    const { posts } = attributes;

    return (
      <div>
        {posts.map((post) => (
          <div key={post.id} className="slide">
            <img
              src={post.jetpack_featured_media_url}
              alt={post.title.rendered}
            />
            <h2>{post.title.rendered}</h2>
            <p>{post.date}</p>
          </div>
        ))}
      </div>
    );
  },
});
