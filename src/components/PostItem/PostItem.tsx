import {useEffect, useState} from "react";
import {Messages} from "../../types.ts";
const urlGet = "http://146.185.154.90:8000/messages";

const PostItem = () => {
    const[posts, setPosts] = useState<Messages[]>([]);

    useEffect(() => {
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
        void fetchData();
    }, []);

    console.log(posts);

    return (
        <div>

        </div>
    );
};

export default PostItem;