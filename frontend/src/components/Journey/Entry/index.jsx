import "./Entry.css";

function Entry({
  createdAt,
  header,
  icon,
  prompt1,
  prompt1Ans,
  subHeader,
  tags,
}) {
  return (
    <div className="entry">
      <div className="entry-header">
        <div className="entry-header-left">
          {icon}
          <p>
            {header} <br /> <span>{subHeader}</span>
          </p>
        </div>
        {createdAt}
      </div>
      <p>{prompt1}</p>
      <p>{prompt1Ans}</p>
      <div>
        {tags?.map((tag) => (
          <div>{tag}</div>
        ))}
      </div>
    </div>
  );
}

export default Entry;
