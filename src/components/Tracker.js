
const Tracker = () => {
    return (
        <section className="page-section" id="tracker">
        <div className="container">
            <div className="text-center">
                <h2 className="section-heading text-uppercase">Contact Us</h2>
                <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
            </div>
            <div className="row align-items-stretch mb-5">
              <div className="col-md-6">
                  <div className="form-group">
                      <input className="form-control" id="name" type="text" placeholder="Your Name *" data-sb-validations="required" />
                      <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                  </div>
                  <div className="form-group">
                      <input className="form-control" id="email" type="email" placeholder="Your Email *" data-sb-validations="required,email" />
                      <div className="invalid-feedback" >An email is required.</div>
                      <div className="invalid-feedback" >Email is not valid.</div>
                  </div>
                  <div className="form-group mb-md-0">
                      <input className="form-control" id="phone" type="tel" placeholder="Your Phone *" data-sb-validations="required" />
                      <div className="invalid-feedback" >A phone number is required.</div>
                  </div>
              </div>
              <div className="col-md-6">
                  <div className="form-group form-group-textarea mb-md-0">
                      <textarea className="form-control" id="message" placeholder="Your Message *" data-sb-validations="required"></textarea>
                      <div className="invalid-feedback">A message is required.</div>
                  </div>
              </div>
          </div>
          <div className="d-none" id="submitMessage">
              <div className="text-center text-white mb-3">
                  <div className="fw-bolder">Form submission successful!</div>
                  To activate this form, sign up at
                  <br />
              </div>
          </div>
          <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
          <div className="text-center"><button className="btn btn-primary btn-xl text-uppercase disabled" id="submitButton" type="submit">Send Message</button></div>
  </div>
    </section>

    )
}

export default Tracker
