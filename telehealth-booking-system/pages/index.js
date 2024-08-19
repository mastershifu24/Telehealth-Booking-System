// pages/index.js
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to the Telehealth Booking System</h1>
        <p>Book your appointments easily and efficiently.</p>
      </div>
    );
  }