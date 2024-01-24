const StatCard = ({
  title = "LOANS",
  icon = "bi-coin",
  mainNumber = "$100,000",
  arrowIcon = "bi-arrow-up",
  arrowIconColor = "success",
  subNumber = "3.6%",
  subText,
}) => {
  return (
    <div>
      <div
        className="card card-stats mb-4 mb-xl-0 mx-2"
        style={{ width: "300px", minWidth: "300px", height: "140px" }}
      >
        <div className="card-body d-flex flex-column justify-content-center">
          <div className="row align-items-center">
            <div className="col">
              <h5 className="card-title text-uppercase text-muted mb-0">
                {title}
              </h5>
              <span className="h2 font-weight-bold mb-0">{mainNumber}</span>
            </div>
            <div className="col-auto">
              <div>
                <i className={`bi ${icon} display-5`}></i>
              </div>
            </div>
          </div>
          {subText && (
            <div className="row">
              <p className="mt-3 mb-0 text-muted text-sm">
                <span className={`text-${arrowIconColor} mr-2`}>
                  <i className={`bi ${arrowIcon} font-weight-bold`}></i>{" "}
                  {subNumber}
                </span>
                <span className="text-nowrap ms-2">{subText}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default StatCard;
