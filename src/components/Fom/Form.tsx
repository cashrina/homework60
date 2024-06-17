const Form = () => {
    return (
        <form>
            <div className="mb-3">
                <label className="form-label">Admin</label>
                <input type="text" className="form-control"  aria-describedby="Write your name please"/>
                <div className="form-text">Write your name please.</div>
            </div>
            <div className="mb-3">
                <label className="form-label">Message</label>
                <input type="text" className="form-control"/>
                <div className="form-text">Write message please.</div>
            </div>
            <button type="submit" className="btn btn-outline-primary">Submit</button>
        </form>
    );
};

export default Form;