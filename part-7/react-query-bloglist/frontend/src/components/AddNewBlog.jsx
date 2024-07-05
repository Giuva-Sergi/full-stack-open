import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { showMessage } from "../reducers/notificationReducer";
import Form from "./Form";
import Label from "./Label";
import InputText from "./InputText";
import { FaPen } from "react-icons/fa6";

function AddNewBlog() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    const message = `a new blog ${title} by ${author} added`;
    dispatch(createBlog(newBlog));
    dispatch(showMessage({ message, type: "success" }, 3.5));
    setTitle("");
    setAuthor("");
    setUrl("");
  }
  return (
    <div>
      <h2 className="uppercase text-xl text-blue-500 text-center font-semibold my-8">
        create new
      </h2>
      <Form handlerFn={handleSubmit} type="createBlog">
        <Label>title:</Label>
        <InputText
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="write title here"
        />
        <Label>author:</Label>
        <InputText
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="write author here"
        />
        <Label>url:</Label>
        <InputText
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="write url here"
        />
        <button className="place-self-end mt-6 border-2 border-white bg-cyan-300 p-3 rounded-full text-white hover:border-cyan-600 hover:bg-white hover:text-cyan-300 transition ease-in">
          <FaPen />
        </button>
      </Form>
    </div>
  );
}

export default AddNewBlog;
