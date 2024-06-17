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

    const dateFormat = (date: string): string => {
        let d:Date = new Date(date);
        return [d.getMonth() + 1,
                d.getDate(),
                d.getFullYear()].join('/') + ' ' +
            [d.getHours(),
                d.getMinutes(),
                d.getSeconds()].join(':');
    };

    return (
        <div className="row">
            {posts.map(post => (
                <div key={post._id} className="col-md-6 mb-4 mt-3">
                    <div className="card border border-primary shadow p-3 mb-5 bg-body-tertiary" style={{height:'70%'}}>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-8">
                                    <h5 className="card-title text-primary">{post.author}</h5>
                                </div>
                                <div className="col-md-4">
                                    <p className="card-text text-muted">{dateFormat(post.datetime)}</p>
                                </div>
                            </div>
                            <p className="card-text">{post.message}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostItem;