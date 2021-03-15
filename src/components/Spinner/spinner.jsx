import CircularProgress from "@material-ui/core/CircularProgress";
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="spinner">
      <CircularProgress />
    </div>
  );
};

export default Spinner;
