export const CommentButton = ({ toggleComments }) => {
  return (
    <>
      <button className="w-full border-2 p-2 bg-white" onClick={toggleComments}>
        Show Comments
      </button>
    </>
  );
};
