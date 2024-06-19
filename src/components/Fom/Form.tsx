
import { FormState } from "../../types.ts";
import React, {useState} from "react";

const Form = () => {
    const [formState, setFormState] = useState<FormState>({
        message: "",
        author: "",
    });

    const changePost = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const url = 'http://146.185.154.90:8000/messages';
            const data = new URLSearchParams();
            data.set('message', formState.message);
            data.set('author', formState.author);

            await fetch(url, {
                method: 'post',
                body: data,
            });
            setFormState({
                message: "",
                author: "",
            });

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div className="mb-3">
                <label className="form-label">Admin</label>
                <input
                    required
                    style={{ cursor: "pointer" }}
                    type="text"
                    className="form-control"
                    aria-describedby="Write your name please"
                    name="author"
                    value={formState.author}
                    onChange={changePost}
                />
                <div className="form-text">Write your name please.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Message</label>
                <input
                    required
                    style={{ cursor: "pointer" }}
                    type="text"
                    className="form-control"
                    name="message"
                    value={formState.message}
                    onChange={changePost}
                />
                <div className="form-text">Write message please.</div>
            </div>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
        </form>
    );
};

export default Form;
