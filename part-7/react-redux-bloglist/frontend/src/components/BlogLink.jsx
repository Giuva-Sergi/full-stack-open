import { Link } from "react-router-dom";
import { FaBookReader } from "react-icons/fa";

function BlogLink({ blog }) {
  return (
    <li className="w-3/4 p-3 flex justify-between cursor-pointer border border-blue-200 mb-8 rounded-md hover:bg-blue-400 transition ease-in hover:text-white mx-auto">
      <Link to={`/blogs/${blog.id}`} className="text-lg">
        <h4>{blog.title}</h4>
      </Link>
      <FaBookReader />
    </li>
  );
}

export default BlogLink;
