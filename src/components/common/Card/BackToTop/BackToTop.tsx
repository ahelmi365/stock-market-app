const BackToTop = () => {
  return (
    <button
      style={{ cursor: "pointer", padding: "10px" }}
      type="button"
      className="btn border-1 border btn-warning"
      onClick={() => window.scrollTo(0, 0)}
      title="Scroll to Top"
      aria-label="Scroll to Top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-circle-arrow-up"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="m16 12-4-4-4 4" />
        <path d="M12 16V8" />
      </svg>
    </button>
  );
};

export default BackToTop;