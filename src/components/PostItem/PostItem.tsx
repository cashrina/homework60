import {useEffect, useState} from "react";
import {Messages} from "../../types.ts";
const urlGet = "http://146.185.154.90:8000/messages";

const PostItem = () => {
    const[posts, setPosts] = useState<Messages[]>([]);

    const fetchData = async () => {
        const response = await fetch(urlGet);

        if (response.ok) {
            const posts = await response.json() as Messages[];
            const newPosts = posts.map(post => ({
                _id: post._id,
                message: post.message,
                author: post.author,
                datetime: post.datetime,
            }));
            setPosts(newPosts);
        }
    };

    useEffect(() => {
        void fetchData();
        setInterval(fetchData, 5000);
    }, []);

    console.log(posts);

    return (
        <div className="card" style={{width: "18rem"}}>
            {posts.map(post => (
                <div key={post._id} className="card-body">
                    <h5 className="card-title">{post.author}</h5>
                    <p className="card-text">{post.message}</p>
                </div>
            ))}
        </div>
    );
};

export default PostItem;