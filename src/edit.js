import { InspectorControls, RichText } from "@wordpress/block-editor";
import {
  PanelBody,
  TextControl,
  Button,
  FormToggle,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

const edit = ({ attributes, setAttributes }) => {
  const {
    API_URL,
    posts,
    title,
    autoPlay,
    infiniteLoop,
    arrowButton,
    isTitleShow,
    isDescShow,
    isDateShow,
  } = attributes;
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const getMonthAbbreviation = (monthIndex) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  };

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const newData = data.map((item) => {
        const originalDate = new Date(item.date);
        const formattedDate = `${originalDate.getDate()} ${getMonthAbbreviation(
          originalDate.getMonth()
        )} ${originalDate.getFullYear()}`;
        return {
          id: item.id,
          title: item.title.rendered,
          desc: item.excerpt.rendered,
          date: formattedDate,
          link: item.link,
          img_url: item.jetpack_featured_media_url,
        };
      });

      setAttributes({ posts: newData });
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
        <PanelBody title="Slider Settings">
          <TextControl
            label="API URL"
            value={API_URL}
            onChange={(value) => setAttributes({ API_URL: value })}
          />
          <Button variant="primary" onClick={handleFetch}>
            Save
          </Button>
        </PanelBody>

        <PanelBody title="Slides Settings" initialOpen={false}>
          <div className="toggle-body">
            <div className="toggle-box">
              <FormToggle
                checked={autoPlay}
                onChange={() => setAttributes({ autoPlay: !autoPlay })}
              />
              <label className="label">Auto play</label>
            </div>

            <div className="toggle-box">
              <FormToggle
                checked={infiniteLoop}
                onChange={() => setAttributes({ infiniteLoop: !infiniteLoop })}
              />
              <label className="label">Infinite loop</label>
            </div>

            <div className="toggle-box">
              <FormToggle
                checked={arrowButton}
                onChange={() => setAttributes({ arrowButton: !arrowButton })}
              />
              <label className="label">Arrow Button</label>
            </div>
          </div>
        </PanelBody>

        <PanelBody title="Toggle Metadata" initialOpen={false}>
          <div className="toggle-body">
            <div className="toggle-box">
              <FormToggle
                checked={isTitleShow}
                onChange={() => setAttributes({ isTitleShow: !isTitleShow })}
              />
              <label className="label">Post Title</label>
            </div>

            <div className="toggle-box">
              <FormToggle
                checked={isDescShow}
                onChange={() => setAttributes({ isDescShow: !isDescShow })}
              />
              <label className="label">Post Description</label>
            </div>

            <div className="toggle-box">
              <FormToggle
                checked={isDateShow}
                onChange={() => setAttributes({ isDateShow: !isDateShow })}
              />
              <label className="label">Post Date</label>
            </div>
          </div>
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
                    src={post.img_url}
                    alt={post.title}
                  />
                </a>
                <div className="post-content">
                  {isTitleShow ? (
                    <a href={post.link}>
                      <h4 className="post-title">{post.title}</h4>
                    </a>
                  ) : (
                    ""
                  )}

                  {isDescShow ? (
                    <div className="post-desc">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.desc,
                        }}
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  {isDateShow ? (
                    <label className="post-date">{post.date}</label>
                  ) : (
                    ""
                  )}
                </div>
              </li>
            ))}
          </ul>

          {arrowButton ? (
            <>
              <button type="button" id="prev-button" className="prev-icon">
                <span className="dashicons dashicons-arrow-left-alt2"></span>
              </button>
              <button type="button" id="next-button" className="next-icon">
                <span className="dashicons dashicons-arrow-right-alt2"></span>
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default edit;
