'use client';

import { useRef, useEffect } from 'react';
import styles from './contactForm.module.scss';

export default function ContactForm() {
  useEffect(() => {
    activateFormButtonHandler();
  }, []);

  const nameInput = useRef<HTMLInputElement>();
  const emailInput = useRef<HTMLInputElement>();
  const reasonInput = useRef<HTMLInputElement>();
  const messageInput = useRef<HTMLInputElement>();

  const form = useRef<HTMLFormElement>();
  const spinner = useRef<HTMLDivElement>();
  const formButton = useRef<HTMLButtonElement>();
  const formSentMessage = useRef<HTMLDivElement>();

  function showError(input, message) {
    input.current.childNodes[0].classList.remove(
      styles.ContactFormInputSuccess
    );
    input.current.childNodes[0].classList.add(styles.ContactFormInputError);
    const errorMessage = input.current.childNodes[2];
    errorMessage.classList.add(styles.error);
    errorMessage.style.display = 'inline-block';
    errorMessage.textContent = message;
  }

  function showSuccess(input) {
    input.current.childNodes[0].classList.remove(styles.ContactFormInputError);
    input.current.childNodes[0].classList.add(styles.ContactFormInputSuccess);
    const errorMessage = input.current.childNodes[2];
    errorMessage.style.display = 'none';
    errorMessage.classList.remove(styles.error);
  }

  function validateEmail(email) {
    const regExp =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExp.test(String(email).toLowerCase());
  }

  function checkNameField() {
    const nameInputFirstChild = nameInput.current
      .childNodes[0] as HTMLInputElement;

    if (nameInputFirstChild?.value.trim() === '') {
      showError(nameInput, 'Please, enter your name');
    } else if (nameInputFirstChild?.value.length < 3) {
      showError(nameInput, 'Your name needs to be longer than 2 characters');
    } else if (nameInputFirstChild?.value.length > 21) {
      showError(nameInput, 'Your name needs to be shorter than 20 characters');
    } else {
      showSuccess(nameInput);
    }
    activateFormButtonHandler();
  }

  function checkEmailField() {
    const emailInputFirstChild = emailInput.current
      .childNodes[0] as HTMLInputElement;

    if (emailInputFirstChild?.value === '') {
      showError(emailInput, 'Please, enter your email');
    } else if (!validateEmail(emailInputFirstChild?.value)) {
      showError(emailInput, 'Please, enter a valid email');
    } else {
      showSuccess(emailInput);
    }
    activateFormButtonHandler();
  }

  function checkReasonField() {
    const reasonInputFirstChild = reasonInput.current
      .childNodes[0] as HTMLInputElement;

    if (reasonInputFirstChild?.value.trim().length === 0) {
      showError(reasonInput, 'Please, enter the subject of your message');
    } else if (reasonInputFirstChild?.value.length < 5) {
      showError(
        reasonInput,
        'The reason of your message needs to be longer than 4 characters'
      );
    } else if (reasonInputFirstChild?.value.length > 26) {
      showError(
        reasonInput,
        'The reason of your message needs to be shorter than 25 characters'
      );
    } else {
      showSuccess(reasonInput);
    }
    activateFormButtonHandler();
  }

  function checkMessageField() {
    const messageInputFirstChild = messageInput.current
      .childNodes[0] as HTMLTextAreaElement;

    if (messageInputFirstChild?.value.trim() === '') {
      showError(messageInput, 'Please, enter your message');
    } else if (messageInputFirstChild?.value.length < 31) {
      showError(
        messageInput,
        'Your message needs to be longer than 30 characters'
      );
    } else if (messageInputFirstChild?.value.length > 501) {
      showError(
        messageInput,
        'Your message needs to be shorter than 500 characters'
      );
    } else {
      showSuccess(messageInput);
    }
    activateFormButtonHandler();
  }

  // WAIT FOR USER TO STOP TYPING:
  // https://schier.co/blog/wait-for-user-to-stop-typing-using-javascript

  // Init a timeout variable to be used below

  let timeout = null;

  function keyUpInputHandler(checkInputFunction) {
    clearTimeout(timeout);

    // Make a new timeout set
    timeout = setTimeout(() => {
      checkInputFunction();
    }, 200);
  }

  function activateFormButtonHandler() {
    clearTimeout(timeout);

    // Make a new timeout set
    timeout = setTimeout(() => {
      if (
        (nameInput.current.childNodes[0] as HTMLInputElement)?.value.length >
          2 &&
        (emailInput.current.childNodes[0] as HTMLInputElement)?.validity
          .valid === true &&
        (reasonInput.current.childNodes[0] as HTMLInputElement)?.value.length >
          4 &&
        (messageInput.current.childNodes[0] as HTMLInputElement)?.value.length >
          30
      ) {
        formButton.current.classList.remove(styles.deactivateButton);
        formButton.current.classList.add(styles.activateButton);
      } else {
        formButton.current.classList.remove(styles.activateButton);
        formButton.current.classList.add(styles.deactivateButton);
      }
    }, 200);
  }

  function submitFormHandler(event) {
    event.preventDefault();

    spinner.current.style.display = 'flex';
    formButton.current.style.display = 'none';
    setTimeout(() => {
      spinner.current.style.display = 'none';
      formSentMessage.current.style.display = 'block';
    }, 2000);
    setTimeout(() => {
      formSentMessage.current.style.display = 'none';
      formButton.current.style.display = 'block';
      formButton.current.innerHTML = 'Send another form';

      (form.current[1] as HTMLInputElement).value = '';
      form.current[1].classList.remove(styles.ContactFormInputSuccess);

      (form.current[2] as HTMLInputElement).value = '';
      form.current[2].classList.remove(styles.ContactFormInputSuccess);

      (form.current[3] as HTMLInputElement).value = '';
      form.current[3].classList.remove(styles.ContactFormInputSuccess);

      (form.current[4] as HTMLInputElement).value = '';
      form.current[4].classList.remove(styles.ContactFormInputSuccess);

      activateFormButtonHandler();
    }, 4000);
  }

  return (
    <form ref={form} onSubmit={(event) => submitFormHandler(event)}>
      <fieldset className={styles.Fieldset}>
        <legend className={styles.Legend}>Contact Form</legend>
        <div className={styles.FormField} ref={nameInput}>
          <input
            className={styles.ContactFormInput}
            onKeyUp={() => keyUpInputHandler(checkNameField)}
            id='name-input'
            placeholder='Your name'
            type='text'
            minLength={2}
            maxLength={20}
            required
          />
          <label className={styles.ContactFormLabel} htmlFor='name-input'>
            Your name
          </label>
          <small></small>
        </div>
        <div className={styles.FormField} ref={emailInput}>
          <input
            className={styles.ContactFormInput}
            onKeyUp={() => keyUpInputHandler(checkEmailField)}
            id='email-input'
            placeholder='Your email'
            type='text'
            pattern='^(([^&lt;&gt;()\[\]\\.,;:\s@"]+(\.[^&lt;&gt;()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
            title='Valid emails consist of "Username" + "@" + "domain"'
            required
          />
          <label className={styles.ContactFormLabel} htmlFor='email-input'>
            Your email
          </label>
          <small></small>
        </div>
        <div className={styles.FormField} ref={reasonInput}>
          <input
            className={styles.ContactFormInput}
            onKeyUp={() => keyUpInputHandler(checkReasonField)}
            placeholder='The reason of your message'
            id='reason-input'
            list='reason-input-choices'
            minLength={5}
            maxLength={25}
            required
          />
          <label className={styles.ContactFormLabel} htmlFor='reason-input'>
            Reason
          </label>
          <small></small>
          <datalist id='reason-input-choices'>
            <option value='Request of quotation' />
            <option value='Request of collaboration' />
            <option value='Job offer' />
            <option value='Other (write it down)' />
          </datalist>
        </div>
        <div className={styles.FormField} ref={messageInput}>
          <textarea
            className={styles.ContactFormInput}
            onKeyUp={() => keyUpInputHandler(checkMessageField)}
            id='textarea-input'
            placeholder='Your message'
            minLength={30}
            maxLength={500}
            required
          ></textarea>
          <label className={styles.ContactFormLabel} htmlFor='textarea-input'>
            Your message
          </label>
          <small></small>
        </div>
        <div className={styles.spinner} ref={spinner}>
          <div className={styles.bounce1}></div>
          <div className={styles.bounce2}></div>
          <div className={styles.bounce3}></div>
        </div>
        <div className={styles.formSentMessage} ref={formSentMessage}>
          <p>The form was sent &nbsp; &#9996;</p>
        </div>
        <button
          className={`${styles.ButtonSendForm} ${styles.deactivateButton}`}
          ref={formButton}
        >
          Send form
        </button>
      </fieldset>
    </form>
  );
}
