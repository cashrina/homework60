import {Messages} from "../../types.ts";
import React, {useState} from "react";


interface FormProps {
    onsubmit: (message:Messages) => void;
    method: string,
    body: string,
}

interface FormState {
    message: string,
    author: string,
}

const Form: React.FC<FormProps> = ({onsubmit}) => {
    const [authorMessage, setAuthorMessage] = useState<FormState>({
        message: '',
        author: '',
    });

    const changeMessage = (event:React.ChangeEvent<HTMLInputElement>) => {
        setAuthorMessage((prev) => ({ ...prev,
             [event.target.name]: event.target.value,
        }));
    };

    const onFormSubmit = async (event:React.FormEvent) => {
        event.preventDefault();
        try {
            const url = 'http://146.185.154.90:8000/messages';
            const data = new URLSearchParams();
            data.set('message', authorMessage.message);
            data.set('author', authorMessage.author);
            console.log(authorMessage)
            await fetch(url, {
                method: 'post',
                body: data,
            });
        } catch (e) {
            console.error(e);
        }

    };

    return (
        <form onSubmit={onFormSubmit}>
            <div className="mb-3">
                <label className="form-label">Admin</label>
                <input type="text"
                       className="form-control"
                       aria-describedby="Write your name please"
                       name="author" onChange={changeMessage}/>
                <div className="form-text">Write your name please.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Message</label>
                <input type="text" className="form-control" name="message" onChange={changeMessage}/>
                <div className="form-text">Write message please.</div>
            </div>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
        </form>
    );
};

export default Form;