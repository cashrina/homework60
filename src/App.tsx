import Form from "./components/Fom/Form.tsx";
import {useState} from "react";
import {Messages} from "./types.ts";

const App = () => {
    const [message, setMessage] = useState<Messages[]>([]);

    const addData = (data: Messages) => {
        setMessage((prev)=> [...prev, data]);
    };

    return (
    <div className="container mt-3">
        <Form onsubmit={addData} />
        <hr/>
    </div>
  )
};

export default App
