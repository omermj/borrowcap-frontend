/** Form Error Message */

const FormError = ({ msg, field = false }) => {
  // if server error, set margin top to 3 and center text
  const style = field ? "mt-1 text-left" : "mt-3 text-center";

  return (
    <div className={style}>
      {typeof msg === "Array" ? (
        msg.map((m, idx) => (
          <div key={idx}>
            {" "}
            <small className="text-danger">{m}</small>
          </div>
        ))
      ) : (
        <div>
          <small className="text-danger">{msg}</small>
        </div>
      )}
    </div>
  );
};

export default FormError;
