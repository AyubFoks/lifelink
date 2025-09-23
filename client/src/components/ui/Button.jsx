export default function Button({ children, type = "button", ...props }) {
  return (
    <button
      type={type}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      {...props}
    >
      {children}
    </button>
  );
}
