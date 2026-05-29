import React from "react";
import { Link } from "react-router-dom";
import service from "../../appwrite/config";

const PostCard = ({ $id, title, featureImage }) => {
  return (
    <Link to={`/post/${$id}`} className="block">
      <article className="overflow-hidden bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        
        {/* Featured Image */}
        <div className="aspect-video overflow-hidden">
          <img
            src={service.getFilePreview(featureImage)}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {title}
          </h2>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;