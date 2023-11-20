const save = ({ attributes }) => {
  const {
    posts,
    autoPlay,
    infiniteLoop,
    arrowButton,
    isTitleShow,
    isDescShow,
    isDateShow,
  } = attributes;

  return (
    <div
      className="slide-container"
      style={{ margin: "0!important", maxWidth: "none" }}
    >
      <ul
        className="slider"
        data-autoplay={autoPlay}
        data-infiniteloop={infiniteLoop}
      >
        {posts.map((post, index) => (
          <li key={post.id} className="slide">
            <a href={post.link}>
              <img className="post-thumb" src={post.img_url} alt={post.title} />
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
  );
};

export default save;
