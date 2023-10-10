import styles from './seats-booking-message.module.scss';

interface SeatsBookingMessageProps {
  seatsQty: number;
  totalPrice: number;
}

const SeatsBookingMessage: React.FC<SeatsBookingMessageProps> = props => {
  return (
    <p className={styles.message}>
      You have selected <span>{props.seatsQty}</span>{' '}
      {props.seatsQty == 1 ? 'seat' : 'seats'} for a price of{' '}
      <span>{props.totalPrice}</span>€
    </p>
  );
};

export default SeatsBookingMessage;
