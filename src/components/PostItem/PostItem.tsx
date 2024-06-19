import { useEffect, useState } from "react";
import { Messages } from "../../types.ts";
import SharkImage from "../../assets/shark.png";

const urlGet = "http://146.185.154.90:8000/messages";

const PostItem = () => {
    const [posts, setPosts] = useState<Messages[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch(urlGet);
            if (response.ok) {
                const newPosts = await response.json() as Messages[];
                const filteredNewPosts = newPosts.filter(newPost =>
                    !posts.find(post => post._id === newPost._id)
                );
                if (filteredNewPosts.length > 0) {
                    const updatedPosts = [...posts, ...filteredNewPosts];
                    updatedPosts.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
                    setPosts(updatedPosts);
                }
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    useEffect(() => {
        void fetchData();

        const interval = setInterval(fetchData, 3000);

        return () => clearInterval(interval);
    }, [posts]);

    const dateFormat = (date: string): string => {
        let d: Date = new Date(date);
        return [
                d.getMonth() + 1,
                d.getDate(),
                d.getFullYear(),
            ].join('/') + ' ' +
            [
                d.getHours(),
                d.getMinutes(),
                d.getSeconds(),
            ].join(':');
    };

    return (
        <div className="row">
            {posts.map(post => (
                <div key={post._id} className="col-md-6 mb-4 mt-3">
                    <div className="card border border-primary shadow p-3 mb-5 bg-body-tertiary">
                        <div className="card-body">
                            <div className="d-flex mb-3">
                                <img alt="icon" src={SharkImage}
                                     style={{ height: '80px', width: '80px', marginRight: '10px' }} className="me-5" />
                                <div className="d-flex justify-content-between">
                                    <h5 className="card-title text-primary mb-0 me-5 ms-5">{post.author}</h5>
                                    <p className="card-text text-muted mb-0 ms-5">{dateFormat(post.datetime)}</p>
                                </div>
                            </div>
                            <p className="card-text text-center">{post.message}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PostItem;
