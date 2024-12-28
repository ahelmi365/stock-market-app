interface ICardProps {
  title: string;
  text: string;
  children?: React.ReactNode;
}
const Card = ({ title, text, children }: ICardProps) => {
  return (
    <div
      className="card h-100 shadow"
      role="region"
      aria-labelledby={`card-title-${title}`}
    >
      <div className="card-body">
        <h5 className="card-title">{title} </h5>
        <p className="card-text"> {text}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;
