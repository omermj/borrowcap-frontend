import { ListGroup } from "react-bootstrap";

/** Component showing common quick links */

const QuickLinks = ({ links }) => {
  return (
    <div className="border border-primary mt-5 pt-1">
      <h4 className="mb-3">Quick Links</h4>
      <ListGroup>
        {links.map((link, idx) => (
          <ListGroup.Item key={idx} action className="mb-1" href={link.link}>
            {link.label}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default QuickLinks;
