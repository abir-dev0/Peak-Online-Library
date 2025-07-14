import "./contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPhone, faAt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export default function Contact(){
    return<>
        <div className="contact-container">
            <main className="row">
                <section className="col left">
                    <div className="contact-title">
                        <h2>Get In Touch</h2>
                        <p>Have a question or suggestion ? We'd love to hear from you! Use the form below to reach out,
                             and we'll get back to you promptly.</p>
                    </div>
                    <div className="contact-info">
                        <div className="icon-grp">
                            <div className="icon"> 
                                <span><FontAwesomeIcon icon={faPhone} /></span>
                            </div>
                            
                            <div className="details">
                                <span>+212 695-576492</span>
                            </div>
                        </div>
                        <div className="icon-grp">
                            <div className="icon">
                                <span><FontAwesomeIcon icon={faAt}/></span>
                            </div>
                            <div className="details">
                                <span>peak@gmail.com</span>
                            </div>
                        </div>

                        <div className="icon-grp">                    
                            <div className="icon">
                                <span><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                            </div>
                            <div className="details">
                                <span>Adress, 123 Street</span>
                            </div>
                        </div>
                    </div>
                    <div className="social-media">
                        <a href="#" className="insta-icon"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="#" className="fb-icon"><FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="#" className="wtsp-icon"><FontAwesomeIcon icon={faWhatsapp} /></a>
                    </div>

                </section>
                <div className="vertical-line"></div>
                <section className="col right">
                    <form className="message-form">
                    <div className="flex-column"><label className="label-urname">Full Name</label></div>
                        <div className="input-form">
                            <input type="text"placeholder="Enter your name" required="required" className="input"/>
                        </div>

                        <div className="flex-column"><label className="label">Email</label></div>
                        <div className="input-form">
                            <input type="email"placeholder="Enter your email" required="required" className="input"/>
                        </div>
                        
                            <div className="flex-column"> 
                                <label className="label">Subject</label>
                            </div>
                            <textarea placeholder="..." className="input"/>
                        <div >
                            <button className="button-form">Send</button>    
                        </div>
                    </form>
                </section>
            </main>
        </div>
    </>
}