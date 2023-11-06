import React from 'react';

const PortfolioGrid = ({ data }) => {
  const { sectionHeading, sectionSubheading, items } = {
    "sectionHeading": "Portfolio",
    "sectionSubheading": "Lorem ipsum dolor sit amet consectetur.",
    "items": [
      {
        "img": "assets/img/portfolio/1.jpg",
        "captionHeading": "Threads",
        "captionSubheading": "Illustration",
        "modal": {
          "projectName": "Name",
          "description": "desc",
          "details": "details",
          "items": [
            {
              "name": "Client1",
              "value": "Threads1"
            },
            {
              "name": "Client11",
              "value": "Threads11"
            },
            {
              "name": "Client111",
              "value": "Threads111"
            }
          ]
        }
      },
      {
        "img": "assets/img/portfolio/2.jpg",
        "captionHeading": "Explore",
        "captionSubheading": "Graphic Design",
        "modal": {
          "projectName": "Name",
          "description": "desc",
          "details": "details",
          "items": [
            {
              "name": "Client2",
              "value": "Threads2"
            },
            {
              "name": "Client22",
              "value": "Threads22"
            },
            {
              "name": "Client222",
              "value": "Threads222"
            }
          ]
        }
      },
      {
        "img": "assets/img/portfolio/3.jpg",
        "captionHeading": "Finish",
        "captionSubheading": "Identity",
        "modal": {
          "projectName": "Name",
          "description": "desc",
          "details": "details",
          "items": [
            {
              "name": "Client3",
              "value": "Threads3"
            },
            {
              "name": "Client33",
              "value": "Threads33"
            },
            {
              "name": "Client333",
              "value": "Threads333"
            }
          ]
        }
      },
      {
        "img": "assets/img/portfolio/4.jpg",
        "captionHeading": "Lines",
        "captionSubheading": "Branding",
        "modal": {
          "projectName": "Name",
          "description": "desc",
          "details": "details",
          "items": [
            {
              "name": "Client4",
              "value": "Threads4"
            },
            {
              "name": "Client44",
              "value": "Threads44"
            },
            {
              "name": "Client444",
              "value": "Threads444"
            }
          ]
        }
      },
      {
        "img": "assets/img/portfolio/5.jpg",
        "captionHeading": "Southwest",
        "captionSubheading": "Website Design",
        "modal": {
          "projectName": "Name",
          "description": "desc",
          "details": "details",
          "items": [
            {
              "name": "Client5",
              "value": "Threads5"
            },
            {
              "name": "Client55",
              "value": "Threads55"
            },
            {
              "name": "Client555",
              "value": "Threads555"
            }
          ]
        }
      },
      {
        "img": "assets/img/portfolio/6.jpg",
        "captionHeading": "Window",
        "captionSubheading": "Photography",
        "modal": {
          "projectName": "Name",
          "description": "desc",
          "details": "details",
          "items": [
            {
              "name": "Client6",
              "value": "Threads6"
            },
            {
              "name": "Client6",
              "value": "Threads6"
            },
            {
              "name": "Client6",
              "value": "Threads6"
            }
          ]
        }
      }
    ]
  };

  return (
    <section className="page-section bg-light" id="portfolio">
      <div className="container">
        <div className="text-center">
          <h2 className="section-heading text-uppercase">{sectionHeading}</h2>
          <h3 className="section-subheading text-muted">{sectionSubheading}</h3>
        </div>
        <div className="row">
          {items.map((item, index) => (
            <div key={index} className="col-lg-4 col-sm-6 mb-4">
              <div className="portfolio-item">
                <a
                  className="portfolio-link"
                  data-bs-toggle="modal"
                  href={`#portfolioModal${index + 1}`}
                >
                  <div className="portfolio-hover">
                    <div className="portfolio-hover-content">
                      <i className="fas fa-plus fa-3x"></i>
                    </div>
                  </div>
                  <img className="img-fluid" src={item.img} alt="..." />
                </a>
                <div className="portfolio-caption">
                  <div className="portfolio-caption-heading">{item.captionHeading}</div>
                  <div className="portfolio-caption-subheading text-muted">
                    {item.captionSubheading}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {items.map((item, index) => (
        <div
          key={index}
          className="portfolio-modal modal fade"
          id={`portfolioModal${index + 1}`}
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="close-modal" data-bs-dismiss="modal">
                <img src="assets/img/close-icon.svg" alt="Close modal" />
              </div>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-8">
                    <div className="modal-body">
                      <h2 className="text-uppercase">{item.modal.projectName}</h2>
                      <p className="item-intro text-muted">{item.modal.description}</p>
                      <img
                        className="img-fluid d-block mx-auto"
                        src={item.img}
                        alt="..."
                      />
                      <p>{item.modal.details}</p>
                      <ul className="list-inline">
                        {item.modal.items.map((modalItem, modalIndex) => (
                          <li key={modalIndex}>
                            <strong>{modalItem.name}:</strong> {modalItem.value}
                          </li>
                        ))}
                      </ul>
                      <button
                        className="btn btn-primary btn-xl text-uppercase"
                        data-bs-dismiss="modal"
                        type="button"
                      >
                        <i className="fas fa-times me-1"></i>
                        Close Project
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default PortfolioGrid;
