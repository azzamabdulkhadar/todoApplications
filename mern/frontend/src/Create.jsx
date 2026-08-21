import { useState } from "react";
import axios from "axios";

const Create = ({ onAdd }) => {
    const [task, setTask] = useState("")

    const handleAdd = () => {
        if (!task.trim()) return;
        axios.post('http://localhost:3005/', { task: task })
            .then(result => {
                onAdd(result.data)
                setTask("")
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="create_form">
            <input
                type="text"
                placeholder="Enter a task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button type="submit" onClick={handleAdd}>Add</button>
        </div>
    );
}

export default Create;
