const Loader = ({ alt = false }) => {
  return (
    <div className={`lds-ring ${alt && "w"}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
export default Loader;
