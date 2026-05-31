import { useContext, useRef, useState } from "react";
import { PostListContext } from "../store/Post-list-store";

const CreatePost = ({ onPostCreated }) => {
  const { addPost } = useContext(PostListContext);
  const [imagePreview, setImagePreview] = useState(null);

  const userIdElement = useRef();
  const postTitleElement = useRef();
  const postBodyElement = useRef();
  const tagsElement = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = userIdElement.current.value;
    const postTitle = postTitleElement.current.value;
    const postBody = postBodyElement.current.value;
    const tags = tagsElement.current.value.split(" ").filter(t => t);

    addPost(userId, postTitle, postBody, { likes: 0, dislikes: 0 }, tags, imagePreview);

    userIdElement.current.value = "";
    postTitleElement.current.value = "";
    postBodyElement.current.value = "";
    tagsElement.current.value = "";
    setImagePreview(null);
    onPostCreated();
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <div className="create-post-title">✏️ Create Post</div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              ref={userIdElement}
              className="form-input"
              placeholder="Enter your name or ID"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Post Title</label>
            <input
              type="text"
              ref={postTitleElement}
              className="form-input"
              placeholder="What's on your mind?"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Post Content</label>
            <textarea
              ref={postBodyElement}
              rows="4"
              className="form-input"
              placeholder="Tell us more about it..."
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Photo (optional)</label>
            {!imagePreview ? (
              <div className="image-upload-area">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <span className="upload-icon">📷</span>
                <div className="upload-text">
                  <span>Click to upload</span> or drag & drop
                </div>
              </div>
            ) : (
              <div className="image-preview">
                <img src={imagePreview} alt="preview" />
                <button
                  type="button"
                  className="image-preview-remove"
                  onClick={() => setImagePreview(null)}
                >✕</button>
              </div>
            )}
          </div>
          <div className="form-group">
            <label className="form-label">Tags</label>
            <input
              type="text"
              ref={tagsElement}
              className="form-input"
              placeholder="travel food life (space separated)"
            />
          </div>
          <button type="submit" className="submit-btn">
            Publish Post →
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;