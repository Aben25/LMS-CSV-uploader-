import { useState } from 'react';
import axios from 'axios';

const EmailPopup = () => {
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setErrorMessage("Please provide a valid email address.");
            return;
        } else {
            setErrorMessage("");
        }

        setLoading(true);

        const pathname = window.location.pathname;
        const subjectLine = "Transportation Facts";
        const filename = "transportation_facts.pdf";

        const formData = {
            email: email,
            url: "https://transpoinfo.org" + pathname,
            bodyText: "Attached you will find a PDF export of transportation facts from our website",
            subjectLine: subjectLine,
            filename: filename,
        };

        const urlParams = Object.keys(formData)
            .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(formData[key]))
            .join("&");

        axios({
            method: "post",
            url: "https://b4qyaiouscte5mtek47e3piaaq0hdnls.lambda-url.us-east-1.on.aws/?" + urlParams,
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.data.message === "Success") {
                    console.log("Success!", urlParams);
                    setErrorMessage("");
                    setLoading(false);
                    alert("PDF has been sent to your email address!");
                } else {
                    console.log("An error occurred while submitting the form.", response.data);
                    setErrorMessage(response.data.message);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                setErrorMessage("An error occurred while submitting the form. Please refresh the page and try again.");
                setLoading(false);
            });
    };

    return (
        <div className="modal" tabIndex="-1" role="dialog" id="formModal2" style={{ marginTop: "5%" }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Email PDF</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group row">
                                <label htmlFor="email-input" className="col-12">
                                    Email Address
                                </label>
                                <div className="col-12">
                                    <input
                                        type="email"
                                        className={`form-control ${errorMessage ? "is-invalid" : ""}`}
                                        id="email-input"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    {errorMessage && <div className="invalid-feedback">{errorMessage}</div>}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary">
                                    {loading ? "Sending..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailPopup;
