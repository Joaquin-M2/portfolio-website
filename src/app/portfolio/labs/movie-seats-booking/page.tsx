"use client";

import { useState, useEffect, useRef } from "react";

import MoviesContainer from "@/components/z-labs/movie-seats-booking/movies-container/movies-container";
import SeatsLegend from "@/components/z-labs/movie-seats-booking/seats-legend/seats-legend";
import CinemaRoom from "@/components/z-labs/movie-seats-booking/cinema-room/cinema-room";
import SeatsBookingMessage from "@/components/z-labs/movie-seats-booking/seats-booking-message/seats-booking-message";

import TonguesContainer from "@/components/TonguesContainer/TonguesContainer";

import styles from "./movie-seats-booking.module.scss";

const Page: React.FC = () => {
  const [currentMovie, setCurrentMovie] = useState<number>(0);
  const [moviePrice, setMoviePrice] = useState<number>(8);
  const [selectedSeats, setSelectedSeats] = useState<number>(0);
  const [movies, setMovies] = useState<Array<JSX.Element[]>>([]);
  const [screenMovieName, setScreenMovieName] = useState<string>(null);

  const movieSelection = useRef<HTMLSelectElement>();

  /**
   * Function to transform clicked Free seats into Selected seats. It is used as the function
   * to be executed as an onClick event of the elements (Seats) created on the "createSeats()"
   * function.
   *
   * Storing the number of Selected seats allows to calculate the final price.
   */
  function toggleSeat(event): void {
    if (event.target.classList.contains(styles.free)) {
      event.target.classList.remove(styles.free);
      event.target.classList.add(styles.selected);

      setSelectedSeats((prevState) => (prevState += 1));
    } else if (event.target.classList.contains(styles.selected)) {
      event.target.classList.remove(styles.selected);
      event.target.classList.add(styles.free);

      setSelectedSeats((prevState) => (prevState -= 1));
    }
  }

  /**
   * Creates the seats (JSX elements) for each cinema room. Each seat has an "onClick" event
   * that uses the function "toggleSeats()".
   *
   * It randomly indicates how many seats are already occupied.
   */
  function createSeats(): JSX.Element[] {
    const rowsOfSeats = [];
    for (let i = 1; i < 7; i++) {
      let seats = [];
      let singleRow = (
        <div key={`row ${i * Math.random()}`} className={styles.row}>
          {seats}
        </div>
      );
      for (let i = 1; i < 9; i++) {
        const seatIsOccupied = Math.random();
        seats.push(
          <div
            key={`seat ${i * seatIsOccupied}`}
            data-key={`seat ${i * seatIsOccupied}`}
            className={
              seatIsOccupied > 0.35
                ? `${styles.seat} ${styles.free}`
                : `${styles.seat} ${styles.occupied}`
            }
            onClick={(event) => toggleSeat(event)}
          ></div>
        );
      }
      rowsOfSeats.push(singleRow);
    }
    return rowsOfSeats;
  }

  useEffect(() => {
    if (movies.length === 0) {
      for (let i = 0; i < 4; i++) {
        setMovies((prevState) => [...prevState, createSeats()]);
      }
    }
    setCurrentMovie(movieSelection.current.selectedIndex);
    setMoviePrice(+movieSelection.current.value);
    setScreenMovieName(movieSelection.current[currentMovie].label);
  }, [currentMovie]);

  /**
   * Renders the component.
   */
  return (
    <>
      <div className={styles.background}>
        <MoviesContainer
          UseRefHook={movieSelection}
          OnChangeEvent={() => {
            setCurrentMovie(movieSelection.current.selectedIndex);
            setSelectedSeats(0);
          }}
        />
        <SeatsLegend />
        <CinemaRoom MovieNameOnScreen={screenMovieName}>
          {movies[currentMovie]}
        </CinemaRoom>
        <SeatsBookingMessage
          seatsQty={selectedSeats}
          totalPrice={moviePrice * selectedSeats}
        />
      </div>
      <TonguesContainer CheckCodePath="https://github.com/Joaquin-M2/portfolio-website/blob/master/pages/portfolio/labs/movie-seats-booking/index.tsx" />
    </>
  );
};

export default Page;
