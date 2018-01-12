import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

const Tooltip = ({ text, show }) => {
  return show ? (
    <ListGroup className="d-inline-block">
      <ListGroupItem dangerouslySetInnerHTML={{ __html: text }} />
    </ListGroup>
  ) : false;
};

export default Tooltip;
