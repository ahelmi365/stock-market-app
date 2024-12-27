interface ICardProps {
  title: string;
  text: string;
  children?: React.ReactNode;
}
const Card = ({ title, text, children }: ICardProps) => {
  // className="col-sm-12 col-md-6 col-lg-4"
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title text-center">{title} </h5>
        <p className="card-text"> {text}</p>
        {children}
      </div>
    </div>
  );
};

export default Card;
