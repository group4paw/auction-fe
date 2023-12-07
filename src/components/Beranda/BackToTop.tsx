export default function BackToTop() {
  return (
    <button
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }}
      className="bg-shade-500 hover:bg-pink-500 text-white text-neutral-500 rounded-2xl px-3 h-[45px] flex items-center justify-center "
    >
      Back to top
    </button>
  );
}
