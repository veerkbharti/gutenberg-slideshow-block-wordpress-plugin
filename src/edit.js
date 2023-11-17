import { InspectorControls, RichText } from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

const edit = ({ attributes, setAttributes }) => {
  const { API_URL, posts, title } = attributes;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setAttributes({ posts: data });
      setIsLoading(false);
      setIsError(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const handleFetch = async () => {
    setIsLoading(true);
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <InspectorControls>
        <PanelBody title="Slideshow Settings">
          <TextControl
            label="API URL"
            value={API_URL}
            onChange={(value) => setAttributes({ API_URL: value })}
          />
          <Button onClick={handleFetch}>Save</Button>
        </PanelBody>
      </InspectorControls>

      <RichText
        key="editable"
        tagName="h2"
        placeholder="Slideshow Title"
        value={title}
        onChange={(value) => setAttributes({ title: value })}
      />

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Invalid API url</p>
      ) : (
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
          <button type="button" id="prev-button" className="prev-icon">
            <span className="dashicons dashicons-arrow-left-alt2"></span>
          </button>
          <button type="button" id="next-button" className="next-icon">
            <span className="dashicons dashicons-arrow-right-alt2"></span>
          </button>
        </div>
      )}
    </div>
  );
};

export default edit